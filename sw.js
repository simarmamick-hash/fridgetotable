// sw.js - FridgeToTable service worker
// Strategy: network-first for app files (users always get your latest code when online),
// with the cache as an offline fallback. Recipe requests (/api/) are never cached.

const CACHE_NAME = 'fridge-to-table-v2';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './src/styles/main.css',
    './src/features/recipeGenerator.js',
    './icon-192.png',
    './icon-512.png'
];

// Install: pre-cache the app shell. One missing file will not break the install.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => Promise.allSettled(ASSETS_TO_CACHE.map((asset) => cache.add(asset))))
            .then(() => self.skipWaiting())
    );
});

// Activate: delete old caches and take control of open pages right away.
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

// Fetch: network first, cache as fallback.
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // Only handle simple GET requests for our own site.
    if (request.method !== 'GET') return;
    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    // Never cache or intercept recipe API calls.
    if (url.pathname.startsWith('/api/')) return;

    event.respondWith(
        fetch(request)
            .then((networkResponse) => {
                if (networkResponse && networkResponse.ok) {
                    const copy = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                }
                return networkResponse;
            })
            .catch(() =>
                caches.match(request).then((cached) => {
                    if (cached) return cached;
                    if (request.mode === 'navigate') return caches.match('./index.html');
                    return Response.error();
                })
            )
    );
});
