const CACHE_NAME = 'fridge-to-table-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './src/styles/main.css',
    './src/features/recipeGenerator.js'
];

// Install Event - Cache essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Fetch Event - Cache First Strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
