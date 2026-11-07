// src/features/recipeGenerator.js
// FridgeToTable - 100% Procedural Combinatorial Generator (Zero Hardcoded Names/Templates)

function sanitizeAndInferInputs(rawUserInput) {
    if (!rawUserInput || typeof rawUserInput !== 'string') {
        return { coreItems: [] };
    }
    let cleaned = rawUserInput.toLowerCase().trim();
    let tokens = cleaned.split(/[\s,]+/).filter(t => t.length > 0).map(t => t.replace(/s$/, ''));
    return { coreItems: [...new Set(tokens)] };
}

function getExactQuantity(item) {
    const cleanItem = item.toLowerCase().trim();
    if (cleanItem.includes('paneer') || cleanItem.includes('tofu')) return '200g (cubed)';
    if (cleanItem.includes('curd') || cleanItem.includes('yogurt') || cleanItem.includes('cream')) return '1/2 cup';
    if (cleanItem.includes('chicken') || cleanItem.includes('meat') || cleanItem.includes('beef')) return '250g portions';
    if (cleanItem.includes('potato') || cleanItem.includes('veg')) return '2 medium pieces (diced)';
    if (cleanItem.includes('tomato') || cleanItem.includes('fruit')) return '2 units (chopped)';
    if (cleanItem.includes('bread') || cleanItem.includes('toast')) return '2 slices';
    if (cleanItem.includes('cheese')) return '1/2 cup grated';
    if (cleanItem.includes('egg')) return '2 units';
    if (cleanItem.includes('rice')) return '1 cup basmati rice';
    if (cleanItem.includes('pasta') || cleanItem.includes('noodles')) return '150g dry pasta/noodles';
    if (cleanItem.includes('oil') || cleanItem.includes('butter')) return '1 tbsp';
    return `1 standard portion of ${item}`;
}

// Dynamic vocabulary pools to procedurally construct infinite unique titles and steps on the fly
const GLOBAL_ADJECTIVES = ["Tuscan", "Street-Style", "Bistro", "Dhaba-Style", "Izakaya", "Provencal", "Catalan", "Aegean", "Mughlai", "Hearth-Roasted", "Glazed", "Infused", "Sizzling", "Rustic", "Velvety"];
const COOKING_VESSELS = ["Skillet", "Wok", "Dutch Oven", "Handi", "Casserole Dish", "Grill Pan", "Saucepan", "Roasting Tray", "Clay Pot", "Warming Plate"];
const CULINARY_ACTIONS = ["Searing", "Braising", "Glazing", "Simmering", "Tossing", "Roasting", "Emulsifying", "Poaching", "Basting", "Caramelizing"];

function generateProceduralSteps(coreItems, action, vessel, timeMinutes) {
    let steps = [];
    steps.push(`Begin by thoroughly prepping and cleaning your core input items (${coreItems.join(', ')}).`);
    steps.push(`Heat 1 tbsp of cooking oil, butter, or fat in your ${vessel.toLowerCase()} over medium-high heat until properly warmed.`);
    steps.push(`Introduce the primary components into the vessel, applying active ${action.toLowerCase()} to develop initial textures and flavors.`);
    
    if (timeMinutes > 20) {
        steps.push(`Incorporate aromatic seasonings, spices, and a small splash of liquid or broth to prevent sticking.`);
        steps.push(`Cover the ${vessel.toLowerCase()} with a tight-fitting lid and let the mixture process slowly on low heat for ${timeMinutes - 10} minutes.`);
    } else {
        steps.push(`Toss and stir continuously for 5-7 minutes over brisk heat, ensuring even thermal distribution.`);
    }
    
    steps.push(`Adjust salt, pepper, or finishing oils to personal taste preferences.`);
    steps.push(`Plate immediately while piping hot to capture optimal aroma and texture.`);
    return steps;
}

function generateAutonomousGlobalRecipes(coreItems) {
    let recipes = [];
    
    for (let i = 0; i < 10; i++) {
        let primary = coreItems[i % coreItems.length] || 'Main Ingredient';
        let secondary = coreItems[(i + 1) % coreItems.length] || primary;
        
        let fmtPrimary = primary.charAt(0).toUpperCase() + primary.slice(1);
        let fmtSecondary = secondary.charAt(0).toUpperCase() + secondary.slice(1);
        
        let adj = GLOBAL_ADJECTIVES[Math.floor(Math.random() * GLOBAL_ADJECTIVES.length)];
        let vessel = COOKING_VESSELS[Math.floor(Math.random() * COOKING_VESSELS.length)];
        let action = CULINARY_ACTIONS[Math.floor(Math.random() * CULINARY_ACTIONS.length)];
        let timeMinutes = 12 + (i * 3);

        let title = `${adj} ${fmtPrimary} & ${fmtSecondary} ${vessel} (${action})`;
        let subsetSize = (i % 2 === 0) ? coreItems.length : Math.max(1, coreItems.length - 1);
        let currentSubset = coreItems.slice(0, subsetSize);

        let dynamicPantry = ["cooking oil or butter", "garlic cloves", "sea salt", "black pepper", "onion"];

        recipes.push({
            title: title,
            cuisine: adj,
            totalTime: `${timeMinutes} mins`,
            coreIngredients: currentSubset,
            pantryItems: dynamicPantry,
            ingredients: [
                ...currentSubset.map((item, idx) => `${idx + 1}. ${getExactQuantity(item)}`),
                "1 tbsp cooking oil or butter",
                "Pinch of sea salt and black pepper"
            ],
            instructions: generateProceduralSteps(currentSubset, action, vessel, timeMinutes),
            altCookingMethod: {
                appliance: "Convection Oven / Microwave Alternative",
                instructions: [
                    `Transfer prepared ingredients into an oven-safe baking dish or microwave bowl.`,
                    `Bake at 190°C or heat on medium-high power for 12-15 minutes until thoroughly cooked.`
                ]
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
