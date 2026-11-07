// src/features/recipeGenerator.js
// FridgeToTable - Code S (Autonomous Combinatorial Engine with Unique Alternative Methods)

function sanitizeAndInferInputs(rawUserInput) {
    if (!rawUserInput || typeof rawUserInput !== 'string') {
        return { coreItems: [] };
    }
    let cleaned = rawUserInput.toLowerCase().trim();
    let tokens = cleaned.split(/[\s,]+/).filter(t => t.length > 0).map(t => t.replace(/s$/, ''));
    return { coreItems: [...new Set(tokens)] };
}

function getExactQuantity(item) {
    const clean = item.toLowerCase().trim();
    if (clean.includes('paneer') || clean.includes('tofu')) return `200g ${item} (cubed)`;
    if (clean.includes('curd') || clean.includes('yogurt') || clean.includes('cream')) return `1/2 cup ${item}`;
    if (clean.includes('chicken') || clean.includes('meat') || clean.includes('beef')) return `250g ${item} portions`;
    if (clean.includes('potato') || clean.includes('veg')) return `2 medium ${item} (diced)`;
    if (clean.includes('tomato') || clean.includes('fruit')) return `2 units ${item} (chopped)`;
    if (clean.includes('bread') || clean.includes('toast')) return `2 slices ${item}`;
    if (clean.includes('cheese')) return `1/2 cup grated ${item}`;
    if (clean.includes('egg')) return `2 units ${item}`;
    if (clean.includes('rice')) return `1 cup ${item}`;
    if (clean.includes('pasta') || clean.includes('noodles')) return `150g ${item}`;
    if (clean.includes('oil') || clean.includes('butter')) return `1 tbsp ${item}`;
    return `1 standard portion of ${item}`;
}

const GLOBAL_CUISINES = [
    "Italian", "Mexican", "Thai", "Arabian", "French", 
    "Greek", "Japanese", "North Indian", "Spanish", "Lebanese"
];

const GLOBAL_ADJECTIVES = ["Tuscan", "Street-Style", "Bistro", "Dhaba-Style", "Izakaya", "Provencal", "Catalan", "Aegean", "Mughlai", "Hearth-Roasted"];

// 1. Slow Braise
function getBraiseSteps(core) {
    return [
        `Pat your core ingredients (${core.join(', ')}) thoroughly dry with kitchen paper to prep for braising.`,
        `Warm 1 tbsp of olive oil or butter in a heavy-bottomed Dutch oven over medium heat.`,
        `Add sliced onions and minced garlic, sautéing for 4 minutes until translucent and aromatic.`,
        `Place the core items into the pot, gently searing them on all sides for 3 minutes to lock in juices.`,
        `Pour in 1/2 cup of warm water or vegetable broth, scraping up any browned bits stuck to the bottom of the pot.`,
        `Cover tightly with a heavy lid, reduce heat to the lowest simmer, and braise undisturbed for 20 minutes.`,
        `Remove the lid, check seasoning with sea salt and cracked pepper, and let simmer for 3 minutes to thicken the braising juices.`
    ];
}

// 2. Wok Toss
function getWokSteps(core) {
    return [
        `Slice all core components (${core.join(', ')}) into thin, uniform strips or bite-sized pieces for high-heat cooking.`,
        `In a small bowl, whisk together 1 tbsp soy sauce, a splash of water, and minced garlic to create a quick stir-fry glaze.`,
        `Place a wok or deep skillet over maximum heat until wisps of smoke begin rising from the surface.`,
        `Add 1 tbsp of cooking oil, swirling rapidly to coat the inner walls of the wok.`,
        `Throw in your primary core items first, flash-frying vigorously for 3-4 minutes while tossing constantly.`,
        `Pour the prepared sauce directly down the hot sides of the wok, letting it sizzle and caramelize instantly.`,
        `Toss everything together on high heat for 2 minutes until glossy and coated, then plate immediately.`
    ];
}

// 3. Skillet Sear
function getSkilletSteps(core) {
    return [
        `Dice or portion all core ingredients (${core.join(', ')}) into clean, synchronized cooking sizes.`,
        `Place a heavy cast-iron skillet over high heat and allow it to heat dry for 2 full minutes until screaming hot.`,
        `Melt 1 tbsp of butter or high-smoke oil directly in the center of the skillet.`,
        `Arrange your core ingredients in a single layer, ensuring they have enough space to sear rather than steam.`,
        `Leave undisturbed for 4-5 minutes to build a deeply savory, caramelized crust on the bottom surface.`,
        `Season vigorously with smoked paprika, salt, and black pepper, then flip each piece carefully.`,
        `Squeeze fresh lime or lemon juice over the sizzling pan to deglaze and lift all the rich flavors.`
    ];
}

// 4. Creamy Bake
function getBakeSteps(core) {
    return [
        `Pre-boil or tenderize your base ingredients (${core.join(', ')}) lightly in salted water for 5 minutes; drain well.`,
        `Melt 1 tbsp of butter in a wide skillet over medium flame and sauté minced garlic until golden.`,
        `Incorporate your core components into the skillet, tossing gently for 3 minutes.`,
        `Reduce heat to low and pour in dairy components (like curd, cream, or cheese) along with 2 tbsp of warm water.`,
        `Stir continuously over low heat until the sauce melts and unifies into a rich, velvety emulsion coating.`,
        `Transfer the creamy mixture into an oven-safe baking dish, topping heavily with grated cheese.`,
        `Bake in a preheated oven at 190°C for 10-12 minutes until bubbling, golden-brown, and aromatic.`
    ];
}

// 5. Hearth Roast
function getRoastSteps(core) {
    return [
        `Submerge your core items (${core.join(', ')}) in a small roasting dish with 2 tbsp of olive oil and garlic cloves.`,
        `Toss thoroughly with your hands so every piece is coated in the oil and aromatics.`,
        `Place the roasting dish into a preheated oven or toaster oven set to 180°C.`,
        `Roast slowly for 22 minutes, basting with pan juices halfway through to keep the ingredients exceptionally tender.`,
        `Turn the oven setting to broil for the final 2 minutes to crisp the exterior surfaces to a golden finish.`,
        `Remove carefully, let rest for 3 minutes, and serve warm with pan drippings.`
    ];
}

const TECHNIQUE_FACTORIES = [
    { 
        name: "Slow-Braised Infusion Stew", 
        time: "30 mins", 
        pantry: ["olive oil", "garlic cloves", "bay leaves", "onion", "sea salt", "black pepper"], 
        getSteps: getBraiseSteps,
        appliance: "Covered Oven Casserole Method",
        altSteps: [
            "Transfer your braise ingredients and liquid into an oven-safe Dutch oven or casserole dish.",
            "Seal tightly with a lid or double layer of foil and bake at 160°C for 35 minutes for deep tender infusion."
        ]
    },
    { 
        name: "High-Heat Wok Toss & Glaze", 
        time: "15 mins", 
        pantry: ["sesame oil", "soy sauce", "fresh ginger", "garlic cloves", "green chilies", "cooking oil", "salt"], 
        getSteps: getWokSteps,
        appliance: "High-Heat Sheet Pan Roast Method",
        altSteps: [
            "Spread your tossed ingredients thinly on a pre-heated metal baking sheet.",
            "Roast in your oven at 220°C for 8 minutes for a crisp sheet-pan stir-fry finish."
        ]
    },
    { 
        name: "Cast-Iron Skillet Sear & Crust", 
        time: "20 mins", 
        pantry: ["butter", "smoked paprika", "ground cumin", "lime juice", "garlic", "salt", "black pepper"], 
        getSteps: getSkilletSteps,
        appliance: "Oven Broil Method",
        altSteps: [
            "Arrange your seasoned ingredients on a wire baking rack over a tray.",
            "Broil on the top rack of your oven at 220°C for 6-8 minutes until charred and blistered."
        ]
    },
    { 
        name: "Creamy Emulsion Pan-Bake", 
        time: "25 mins", 
        pantry: ["extra virgin olive oil", "garlic", "parmesan cheese", "fresh herbs", "cream or yogurt", "salt"], 
        getSteps: getBakeSteps,
        appliance: "Deep Microwave Casserole Method",
        altSteps: [
            "Combine your base ingredients and creamy sauce components in a deep microwave-safe glass bowl, covering loosely.",
            "Heat on high power for 8-10 minutes, stirring halfway through until unified."
        ]
    },
    { 
        name: "Rustic Hearth Confit & Roast", 
        time: "28 mins", 
        pantry: ["butter", "olive oil", "garlic cloves", "dried herbs", "sea salt", "black pepper"], 
        getSteps: getRoastSteps,
        appliance: "Low-Temp Slow-Roast Foil Packet",
        altSteps: [
            "Place your ingredients and flavored oil securely inside a heavy-duty aluminum foil packet.",
            "Bake at 150°C for 30 minutes for a delicate, slow-melting confit texture."
        ]
    }
];

function generateAutonomousGlobalRecipes(coreItems) {
    let recipes = [];
    let shuffledCuisines = [...GLOBAL_CUISINES].sort(() => Math.random() - 0.5);

    for (let i = 0; i < 10; i++) {
        let cuisineName = shuffledCuisines[i % shuffledCuisines.length];
        let technique = TECHNIQUE_FACTORIES[i % TECHNIQUE_FACTORIES.length];
        
        let primary = coreItems[i % coreItems.length] || 'Main Ingredient';
        let secondary = coreItems[(i + 1) % coreItems.length] || primary;
        
        let fmtPrimary = primary.charAt(0).toUpperCase() + primary.slice(1);
        let fmtSecondary = secondary.charAt(0).toUpperCase() + secondary.slice(1);
        
        let adj = GLOBAL_ADJECTIVES[Math.floor(Math.random() * GLOBAL_ADJECTIVES.length)];
        let title = `${adj} ${fmtPrimary} & ${fmtSecondary} (${technique.name})`;
        
        let subsetSize = (i % 2 === 0) ? coreItems.length : Math.max(1, coreItems.length - 1);
        let currentSubset = coreItems.slice(0, subsetSize);

        recipes.push({
            title: title,
            cuisine: cuisineName,
            totalTime: technique.time,
            coreIngredients: currentSubset,
            pantryItems: technique.pantry,
            ingredients: [
                ...currentSubset.map((item, idx) => `${idx + 1}. ${getExactQuantity(item)}`),
                ...technique.pantry.slice(0, 3).map(p => `1 tbsp ${p}`)
            ],
            instructions: technique.getSteps(currentSubset),
            altCookingMethod: {
                appliance: technique.appliance, // Fixed: Now uniquely tailored to each cooking technique!
                instructions: technique.altSteps
            }
        });
    }

    return recipes;
}

function extractRequiredPantry(recipes, userCoreItems) {
    let allPantry = recipes.flatMap(r => r.pantryItems || []);
    let uniquePantry = [...new Set(allPantry)];

    return uniquePantry.filter(pantryItem => {
        const pLower = pantryItem.toLowerCase();
        return !userCoreItems.some(core => pLower.includes(core) || core.includes(pLower));
    });
}

export async function findRecipes(userIngredients) {
    const parsed = sanitizeAndInferInputs(userIngredients);
    let userTypedIngredients = parsed.coreItems;

    if (userTypedIngredients.length === 0) return [];

    return generateAutonomousGlobalRecipes(userTypedIngredients);
}

// Event Listener Setup
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn') || document.getElementById('generate');
    const inputElement = document.getElementById('ingredients') || document.getElementById('ingredient-input');
    const resultsContainer = document.getElementById('recipe-results') || document.getElementById('results');

    if (!generateBtn || !inputElement || !resultsContainer) {
        console.error("FridgeToTable Error: Could not find required DOM elements.");
        return;
    }

    generateBtn.addEventListener('click', async () => {
        try {
            const inputVal = inputElement.value;
            const parsed = sanitizeAndInferInputs(inputVal);
            
            if (parsed.coreItems.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="notice-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
                        <p style="color: #d9534f; font-weight: bold; font-size: 1.1rem;">Please enter valid ingredients to generate recipes.</p>
                    </div>
                `;
                return;
            }

            pendingRecipes = await findRecipes(inputVal);
            resultsContainer.innerHTML = '';
            
            const requiredPantry = extractRequiredPantry(pendingRecipes, parsed.coreItems);
            
            if (requiredPantry.length === 0 || localStorage.getItem('pantryApprovedAlways') === 'true') {
                renderFinalResults(pendingRecipes, requiredPantry, resultsContainer);
            } else {
                showPantryCheck(resultsContainer, requiredPantry, pendingRecipes);
            }
        } catch (err) {
            console.error("Recipe Generation Crash:", err);
            resultsContainer.innerHTML = `
                <div class="notice-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
                    <p style="color: #d9534f; font-weight: bold;">Error generating recipes. Check browser console (F12).</p>
                </div>
            `;
        }
    });
});

let pendingRecipes = [];

function showPantryCheck(container, allPantryItems, recipes) {
    try {
        container.innerHTML = `
            <div class="pantry-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <h3>Pantry & Masala Check</h3>
                <p>These recipes require specific items: <strong>${allPantryItems.join(', ')}</strong>.</p>
                <p>Do you have and approve using these?</p>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                    <button id="pantry-opt-1" style="background-color: #28a745; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">1. Yes, I have them</button>
                    <button id="pantry-opt-2" style="background-color: #ffc107; color: #333; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">2. No, I don't have some of these</button>
                    <button id="pantry-opt-3" style="background-color: #007bff; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">3. Yes, I have them and never ask me again</button>
                </div>
            </div>
        `;

        document.getElementById('pantry-opt-1').addEventListener('click', () => {
            try { renderFinalResults(recipes, allPantryItems, container); } catch(e) { console.error(e); }
        });

        document.getElementById('pantry-opt-2').addEventListener('click', () => {
            try { showPantrySelectionChecklist(container, allPantryItems, recipes); } catch(e) { console.error(e); }
        });

        document.getElementById('pantry-opt-3').addEventListener('click', () => {
            try {
                localStorage.setItem('pantryApprovedAlways', 'true');
                renderFinalResults(recipes, allPantryItems, container);
            } catch(e) { console.error(e); }
        });
    } catch (err) {
        console.error("Pantry check render error:", err);
        renderFinalResults(recipes, allPantryItems, container);
    }
}

function showPantrySelectionChecklist(container, allPantryItems, recipes) {
    let checklistHtml = `
        <div class="pantry-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
            <h3>Select the Pantry Items You Have</h3>
            <p>Check the items you currently own from the list below:</p>
            <div style="display: flex; flex-direction: column; gap: 8px; margin: 15px 0;">
    `;

    allPantryItems.forEach((item) => {
        checklistHtml += `
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" class="pantry-checkbox" value="${item}" checked style="width: 18px; height: 18px;">
                <span>${item}</span>
            </label>
        `;
    });

    checklistHtml += `
            </div>
            <button id="confirm-custom-pantry" style="background-color: #ff6b6b; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; width: 100%;">Continue with Selected Items</button>
        </div>
    `;

    container.innerHTML = checklistHtml;

    document.getElementById('confirm-custom-pantry').addEventListener('click', () => {
        try {
            const checkboxes = container.querySelectorAll('.pantry-checkbox');
            const userApprovedItems = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            renderFinalResults(recipes, userApprovedItems, container);
        } catch (err) {
            console.error("Custom pantry error:", err);
        }
    });
}

function renderFinalResults(recipes, pantryUsed, container) {
    try {
        let html = `
            <div class="notice-box" style="margin-bottom: 15px; font-style: italic; color: #555;">
                <p>Recipes synthesized procedurally: <strong>${pantryUsed && pantryUsed.length > 0 ? pantryUsed.join(', ') : 'None'}</strong>.</p>
            </div>
            <h2>Your Recommended Recipes (${recipes.length} available)</h2>
        `;
        
        recipes.forEach((recipe, index) => {
            const coreUsedList = recipe.coreIngredients ? recipe.coreIngredients.map((core, idx) => `<li>${idx + 1}. ${core}</li>`).join('') : '';

            html += `
                <div class="recipe-card" style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
                        <h3 style="margin: 0;">${recipe.title}</h3>
                        <div style="display: flex; gap: 6px;">
                            <span style="background: #e9ecef; color: #495057; font-size: 0.75rem; font-weight: bold; padding: 4px 8px; border-radius: 12px; text-transform: uppercase;">${recipe.cuisine || 'Global'}</span>
                            <span style="background: #d4edda; color: #155724; font-size: 0.75rem; font-weight: bold; padding: 4px 8px; border-radius: 12px;">⏱️ ${recipe.totalTime || '20 mins'}</span>
                        </div>
                    </div>
                    
                    <div class="recipe-section" style="margin-top: 10px;">
                        <strong>Ingredients Breakdown:</strong>
                        <div style="margin-top: 5px; margin-left: 10px;">
                            <p style="margin: 4px 0; font-weight: bold; font-size: 0.9rem; color: #333;">Core Ingredients Used:</p>
                            <ul style="margin-left: 20px; margin-bottom: 6px;">
                                ${coreUsedList}
                            </ul>
                            <p style="margin: 4px 0; font-size: 0.9rem; color: #555;"><strong>Full Recipe Quantities:</strong></p>
                            <ul style="margin-left: 20px; margin-top: 2px;">
                                ${recipe.ingredients ? recipe.ingredients.map(ing => `<li>${ing}</li>`).join('') : ''}
                            </ul>
                        </div>
                    </div>

                    <div class="recipe-section" style="margin-top: 10px;">
                        <strong>Original Method (Pan / Gas):</strong>
                        <ol style="margin-left: 20px; margin-top: 5px;">
                            ${recipe.instructions ? recipe.instructions.map(step => `<li style="margin-bottom: 6px;">${step}</li>`).join('') : ''}
                        </ol>
                    </div>
            `;

            if (recipe.altCookingMethod) {
                html += `
                    <div class="alt-appliance-section" style="margin-top: 15px; border-top: 1px dashed #e0e0e0; padding-top: 10px;">
                        <p style="font-size: 0.9rem; color: #444; margin-bottom: 8px;">Want to cook this using an alternative appliance instead of gas/pan?</p>
                        <button class="toggle-alt-btn" data-index="${index}" style="background-color: #6c757d; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; font-weight: bold;">
                            + View ${recipe.altCookingMethod.appliance}
                        </button>
                        <div id="alt-box-${index}" style="display: none; margin-top: 12px; background: #fdfdfd; padding: 10px; border-left: 3px solid #007bff; border-radius: 4px;">
                            <strong style="color: #007bff;">${recipe.altCookingMethod.appliance}:</strong>
                            <ol style="margin-left: 20px; margin-top: 5px;">
                                ${recipe.altCookingMethod.instructions.map(step => `<li style="margin-bottom: 4px;">${step}</li>`).join('')}
                            </ol>
                        </div>
                    </div>
                `;
            }

            html += `</div>`;
        });
        
        container.innerHTML = html;

        container.querySelectorAll('.toggle-alt-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                const altBox = document.getElementById(`alt-box-${idx}`);
                if (altBox.style.display === 'none') {
                    altBox.style.display = 'block';
                    e.target.textContent = `- Hide Alternative Method`;
                    e.target.style.backgroundColor = '#dc3545';
                } else {
                    altBox.style.display = 'none';
                    e.target.textContent = `+ View ${recipes[idx].altCookingMethod.appliance}`;
                    e.target.style.backgroundColor = '#6c757d';
                }
            });
        });
    } catch (err) {
        console.error("Render Final Results Error:", err);
        container.innerHTML = `<div class="notice-box"><p style="color: red;">Error rendering recipe results.</p></div>`;
    }
}
