// src/features/recipeGenerator.js
// FridgeToTable - AI-powered version.
// Flow: ingredients -> dish ideas (AI) -> pantry permission (staples chosen by the AI per dish)
//       -> tap a dish -> full recipe (AI). No fixed recipe templates anywhere.

const API_URL = '/api/recipes';
const PANTRY_KEY = 'pantryApprovedAlways';
const CACHE_PREFIX = 'f2t-recipe:';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const BOX_STYLE = 'background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;';

// ---------- State ----------
let currentIngredients = [];
let allDishes = [];
let allStaples = [];
let shownDishes = [];
let recipeStore = {};

// ---------- Helpers ----------
class ApiError extends Error {}

function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

export function parseIngredients(raw) {
    if (typeof raw !== 'string') return [];
    const text = raw.toLowerCase().trim();
    // Commas / new lines keep multi-word items together ("bell pepper"); otherwise split on spaces.
    const parts = /[,;\n]/.test(text) ? text.split(/[,;\n]+/) : text.split(/\s+/);
    const items = parts
        .map((p) => p.replace(/\s+/g, ' ').trim())
        .filter((p) => p.length > 0 && p.length <= 40);
    return [...new Set(items)].slice(0, 12);
}

function isAlwaysApproved() {
    try { return localStorage.getItem(PANTRY_KEY) === 'true'; } catch (e) { return false; }
}

function cacheGet(key) {
    try {
        const raw = localStorage.getItem(CACHE_PREFIX + key);
        if (!raw) return null;
        const entry = JSON.parse(raw);
        if (!entry || Date.now() - entry.t > CACHE_TTL_MS) {
            localStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }
        return entry.v;
    } catch (e) {
        return null;
    }
}

function cacheSet(key, value) {
    try { localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ t: Date.now(), v: value })); } catch (e) { /* storage full or blocked: ignore */ }
}

async function callApi(payload) {
    let res;
    try {
        res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (e) {
        throw new ApiError(navigator.onLine
            ? 'Could not reach the server. Please try again.'
            : 'You seem to be offline. Recipes need an internet connection.');
    }

    let data = null;
    try { data = await res.json(); } catch (e) { /* not JSON */ }

    if (!res.ok) {
        throw new ApiError((data && data.error) || (res.status === 429
            ? 'Too many requests right now. Please wait a minute and try again.'
            : 'Something went wrong. Please try again.'));
    }
    return data;
}

function sameWord(a, b) {
    return a.toLowerCase().trim() === b.toLowerCase().trim();
}

// Unique staples across all dishes, excluding anything the user already typed in.
function collectStaples(dishes, userIngredients) {
    const seen = new Set();
    const out = [];
    dishes.forEach((d) => (d.extraStaples || []).forEach((s) => {
        const key = s.toLowerCase().trim();
        if (!key || seen.has(key)) return;
        if (userIngredients.some((u) => key.includes(u) || u.includes(key))) return;
        seen.add(key);
        out.push(s);
    }));
    return out;
}

// Keep only dishes whose staples the user approved.
function filterDishes(dishes, approvedStaples) {
    return dishes.filter((d) => (d.extraStaples || []).every((s) =>
        approvedStaples.some((a) => sameWord(a, s)) || currentIngredients.some((u) => s.toLowerCase().includes(u) || u.includes(s.toLowerCase()))
    ));
}

// ---------- UI pieces ----------
function showNotice(container, message, isError) {
    container.innerHTML = `
        <div class="notice-box" style="${BOX_STYLE} text-align: center;">
            <p style="color: ${isError ? '#d9534f' : '#555'}; font-weight: bold; font-size: 1.05rem;">${escapeHtml(message)}</p>
        </div>`;
}

function showLoading(container, message) {
    container.innerHTML = `
        <div class="notice-box" style="${BOX_STYLE} text-align: center;">
            <p style="color: #555; font-size: 1.05rem;">${escapeHtml(message)}</p>
        </div>`;
}

function showPantryCheck(container, staples) {
    container.innerHTML = `
        <div class="pantry-box" style="${BOX_STYLE}">
            <h3>Pantry & Masala Check</h3>
            <p>To cook these ideas I may use: <strong>${staples.map(escapeHtml).join(', ')}</strong>.</p>
            <p>Do you have and approve using these?</p>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <button id="pantry-opt-1" style="background-color: #28a745; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">1. Yes, I have them</button>
                <button id="pantry-opt-2" style="background-color: #ffc107; color: #333; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">2. No, I don't have some of these</button>
                <button id="pantry-opt-3" style="background-color: #007bff; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">3. Yes, I have them and never ask me again</button>
            </div>
        </div>`;
}

function showPantryChecklist(container, staples) {
    const rows = staples.map((item) => `
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" class="pantry-checkbox" value="${escapeHtml(item)}" checked style="width: 18px; height: 18px;">
            <span>${escapeHtml(item)}</span>
        </label>`).join('');

    container.innerHTML = `
        <div class="pantry-box" style="${BOX_STYLE}">
            <h3>Select the Pantry Items You Have</h3>
            <p>Untick anything you don't have. I'll hide dishes that need it.</p>
            <div style="display: flex; flex-direction: column; gap: 8px; margin: 15px 0;">${rows}</div>
            <button id="confirm-custom-pantry" style="background-color: #ff6b6b; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; width: 100%;">Continue with Selected Items</button>
        </div>`;
}

function renderDishes(container, dishes, hiddenCount) {
    shownDishes = dishes;
    recipeStore = {};

    const hiddenNote = hiddenCount > 0
        ? `<p style="font-size: 0.9rem; color: #777;">${hiddenCount} idea${hiddenCount > 1 ? 's were' : ' was'} hidden because ${hiddenCount > 1 ? 'they need' : 'it needs'} pantry items you don't have.</p>`
        : '';
    const resetBtn = isAlwaysApproved()
        ? `<button id="reset-pantry" style="background: none; border: none; color: #007bff; cursor: pointer; font-size: 0.85rem; padding: 0; text-decoration: underline;">Reset my pantry preference</button>`
        : '';

    let html = `<h2>Your Recommended Dishes (${dishes.length})</h2>${hiddenNote}${resetBtn}`;

    dishes.forEach((d, i) => {
        const uses = (d.mainIngredientsUsed || []).map(escapeHtml).join(', ');
        const needs = (d.extraStaples || []).map(escapeHtml).join(', ');
        html += `
            <div class="recipe-card" style="background: white; padding: 16px; border-radius: 8px; margin: 16px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
                    <h3 style="margin: 0;">${escapeHtml(d.title)}</h3>
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        <span style="background: #e9ecef; color: #495057; font-size: 0.75rem; font-weight: bold; padding: 4px 8px; border-radius: 12px; text-transform: uppercase;">${escapeHtml(d.cuisine || 'Global')}</span>
                        <span style="background: #d4edda; color: #155724; font-size: 0.75rem; font-weight: bold; padding: 4px 8px; border-radius: 12px;">⏱️ ${escapeHtml(d.totalTime || '')}</span>
                    </div>
                </div>
                <p style="margin: 8px 0;">${escapeHtml(d.description)}</p>
                ${uses ? `<p style="margin: 4px 0; font-size: 0.9rem; color: #555;"><strong>Uses:</strong> ${uses}</p>` : ''}
                ${needs ? `<p style="margin: 4px 0; font-size: 0.9rem; color: #555;"><strong>Pantry:</strong> ${needs}</p>` : ''}
                <button class="get-recipe-btn" data-index="${i}" style="margin-top: 10px; background-color: #ff6b6b; color: white; border: none; padding: 8px 14px; border-radius: 6px; cursor: pointer; font-weight: bold;">Get full recipe</button>
                <div id="recipe-body-${i}" style="margin-top: 12px;"></div>
            </div>`;
    });

    container.innerHTML = html;
}

function renderRecipe(recipe, index) {
    const ingredientRows = recipe.ingredients
        .map((i) => `<li>${escapeHtml(i.quantity)} ${escapeHtml(i.name)}</li>`).join('');
    const steps = recipe.steps
        .map((s) => `<li style="margin-bottom: 6px;">${escapeHtml(s)}</li>`).join('');

    let html = `
        <div class="recipe-section">
            <p style="margin: 4px 0; font-size: 0.9rem; color: #555;">Serves ${escapeHtml(recipe.servings)}${recipe.totalTime ? ' · ' + escapeHtml(recipe.totalTime) : ''}</p>
            <strong>Ingredients:</strong>
            <ul style="margin-left: 20px; margin-top: 5px;">${ingredientRows}</ul>
        </div>
        <div class="recipe-section" style="margin-top: 10px;">
            <strong>Method:</strong>
            <ol style="margin-left: 20px; margin-top: 5px;">${steps}</ol>
        </div>`;

    if (recipe.safetyNote) {
        html += `<p style="margin-top: 10px; font-size: 0.9rem; color: #856404; background: #fff3cd; padding: 8px 10px; border-radius: 6px;">⚠️ ${escapeHtml(recipe.safetyNote)}</p>`;
    }

    if (recipe.altMethod) {
        const altSteps = recipe.altMethod.steps
            .map((s) => `<li style="margin-bottom: 4px;">${escapeHtml(s)}</li>`).join('');
        html += `
            <div class="alt-appliance-section" style="margin-top: 15px; border-top: 1px dashed #e0e0e0; padding-top: 10px;">
                <button class="toggle-alt-btn" data-target="alt-box-${index}" data-label="${escapeHtml(recipe.altMethod.appliance)}" style="background-color: #6c757d; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">+ View ${escapeHtml(recipe.altMethod.appliance)}</button>
                <div id="alt-box-${index}" style="display: none; margin-top: 12px; background: #fdfdfd; padding: 10px; border-left: 3px solid #007bff; border-radius: 4px;">
                    <strong style="color: #007bff;">${escapeHtml(recipe.altMethod.appliance)}:</strong>
                    <ol style="margin-left: 20px; margin-top: 5px;">${altSteps}</ol>
                </div>
            </div>`;
    }

    return html;
}

// ---------- Actions ----------
function showDishesFor(container, approvedStaples) {
    const visible = filterDishes(allDishes, approvedStaples);
    if (visible.length === 0) {
        showNotice(container, "None of the ideas work without those pantry items. Try again with different ingredients, or tick more pantry items.", true);
        return;
    }
    renderDishes(container, visible, allDishes.length - visible.length);
}

async function handleGenerate(inputElement, generateBtn, container) {
    const ingredients = parseIngredients(inputElement.value);
    if (ingredients.length === 0) {
        showNotice(container, 'Please enter valid ingredients to generate recipes.', true);
        return;
    }

    generateBtn.disabled = true;
    showLoading(container, 'Thinking up dishes from your ingredients…');

    try {
        const data = await callApi({ mode: 'ideas', ingredients });
        currentIngredients = ingredients;
        allDishes = data.dishes || [];
        allStaples = collectStaples(allDishes, ingredients);

        if (allDishes.length === 0) {
            showNotice(container, 'No ideas came back. Please try again.', true);
        } else if (allStaples.length === 0 || isAlwaysApproved()) {
            showDishesFor(container, allStaples);
        } else {
            showPantryCheck(container, allStaples);
        }
    } catch (err) {
        console.error('Idea generation failed:', err);
        showNotice(container, err instanceof ApiError ? err.message : 'Something went wrong. Please try again.', true);
    } finally {
        generateBtn.disabled = false;
    }
}

async function handleGetRecipe(btn) {
    const index = Number(btn.dataset.index);
    const dish = shownDishes[index];
    const body = document.getElementById(`recipe-body-${index}`);
    if (!dish || !body) return;

    // Already loaded: toggle show/hide.
    if (recipeStore[index]) {
        const hidden = body.style.display === 'none';
        body.style.display = hidden ? 'block' : 'none';
        btn.textContent = hidden ? 'Hide recipe' : 'Show recipe';
        return;
    }

    const cacheKey = [currentIngredients.join('|'), dish.title, (dish.extraStaples || []).join('|')].join('::');
    let recipe = cacheGet(cacheKey);

    if (!recipe) {
        btn.disabled = true;
        body.style.display = 'block';
        body.innerHTML = '<p style="color: #555;">Writing your recipe…</p>';
        try {
            recipe = await callApi({
                mode: 'recipe',
                ingredients: currentIngredients,
                dish: { title: dish.title, cuisine: dish.cuisine, description: dish.description },
                staples: dish.extraStaples || []
            });
            cacheSet(cacheKey, recipe);
        } catch (err) {
            console.error('Recipe generation failed:', err);
            body.innerHTML = `<p style="color: #d9534f; font-weight: bold;">${escapeHtml(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')}</p>`;
            btn.textContent = 'Try again';
            btn.disabled = false;
            return;
        }
    }

    recipeStore[index] = recipe;
    body.style.display = 'block';
    body.innerHTML = renderRecipe(recipe, index);
    btn.textContent = 'Hide recipe';
    btn.disabled = false;
}

function handleToggleAlt(btn) {
    const box = document.getElementById(btn.dataset.target);
    if (!box) return;
    const hidden = box.style.display === 'none';
    box.style.display = hidden ? 'block' : 'none';
    btn.textContent = hidden ? '- Hide Alternative Method' : `+ View ${btn.dataset.label}`;
    btn.style.backgroundColor = hidden ? '#dc3545' : '#6c757d';
}

// ---------- Setup ----------
function init() {
    const generateBtn = document.getElementById('generate-btn') || document.getElementById('generate');
    const inputElement = document.getElementById('ingredients') || document.getElementById('ingredient-input');
    const container = document.getElementById('recipe-results') || document.getElementById('results');

    if (!generateBtn || !inputElement || !container) {
        console.error('FridgeToTable Error: Could not find required DOM elements.');
        return;
    }

    generateBtn.addEventListener('click', () => handleGenerate(inputElement, generateBtn, container));
    inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleGenerate(inputElement, generateBtn, container);
        }
    });

    // One click handler for everything inside the results area.
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        if (btn.classList.contains('get-recipe-btn')) return handleGetRecipe(btn);
        if (btn.classList.contains('toggle-alt-btn')) return handleToggleAlt(btn);

        switch (btn.id) {
            case 'pantry-opt-1':
                return showDishesFor(container, allStaples);
            case 'pantry-opt-2':
                return showPantryChecklist(container, allStaples);
            case 'pantry-opt-3':
                try { localStorage.setItem(PANTRY_KEY, 'true'); } catch (err) { /* ignore */ }
                return showDishesFor(container, allStaples);
            case 'confirm-custom-pantry': {
                const approved = Array.from(container.querySelectorAll('.pantry-checkbox'))
                    .filter((cb) => cb.checked)
                    .map((cb) => cb.value);
                return showDishesFor(container, approved);
            }
            case 'reset-pantry':
                try { localStorage.removeItem(PANTRY_KEY); } catch (err) { /* ignore */ }
                btn.remove();
                return;
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
