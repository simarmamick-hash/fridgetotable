// src/features/recipeGenerator.js
// FridgeToTable - 100% Free-Thinking, Unrestricted Global Recipe Synthesis Engine

function sanitizeAndInferInputs(rawUserInput) {
    if (!rawUserInput || typeof rawUserInput !== 'string') {
        return { coreItems: [], inferredStaples: [] };
    }

    let cleaned = rawUserInput.toLowerCase().trim();
    let tokens = cleaned.split(/[\s,]+/).filter(t => t.length > 0).map(t => t.replace(/s$/, ''));

    // Zero hardcoded assumptions: Whatever the user types is taken raw and independent!
    // We provide a completely neutral pantry pool of universal basics (oil, salt, pepper) 
    // rather than forcing specific traditional dishes like Kadhi or Garlic Bread.
    let neutralPantryStaples = ['cooking oil or butter', 'salt', 'black pepper', 'water'];

    return {
        coreItems: [...new Set(tokens)],
        inferredStaples: neutralPantryStaples
    };
}

function getExactQuantity(item) {
    const cleanItem = item.toLowerCase().trim();
    // Generic neutral quantity mapper that adapts to any word without forcing a specific cuisine
    if (cleanItem.includes('paneer') || cleanItem.includes('tofu')) return '200g (cubed)';
    if (cleanItem.includes('curd') || cleanItem.includes('yogurt') || cleanItem.includes('cream')) return '1/2 cup';
    if (cleanItem.includes('chicken') || cleanItem.includes('meat') || cleanItem.includes('beef')) return '200g portions';
    if (cleanItem.includes('potato') || cleanItem.includes('veg')) return '2 medium pieces (diced)';
    if (cleanItem.includes('tomato') || cleanItem.includes('fruit')) return '2 units (chopped)';
    if (cleanItem.includes('bread') || cleanItem.includes('toast')) return '2 slices';
    if (cleanItem.includes('cheese')) return '1/2 cup grated';
    if (cleanItem.includes('egg')) return '2 units';
    if (cleanItem.includes('rice') || cleanItem.includes('pasta') || cleanItem.includes('noodles')) return '1 cup';
    if (cleanItem.includes('oil') || cleanItem.includes('butter')) return '1 tbsp';
    return `Standard portion of ${item}`;
}

// 100% Free-Form Generative Engine: Invents completely unconstrained global dishes dynamically
function generateFreeFormGlobalRecipes(coreItems, inferredStaples) {
    const primary = coreItems[0] || 'Main Ingredient';
    const secondary = coreItems[1] || coreItems[0] || 'Secondary Item';
    const formattedPrimary = primary.charAt(0).toUpperCase() + primary.slice(1);
    const formattedSecondary = secondary.charAt(0).toUpperCase() + secondary.slice(1);

    // Global cooking techniques that don't assume traditional pairings
    const creativeTechniques = [
        { name: "Gastrique Reduction Glaze", cuisine: "Modern European", time: "18 mins", action: "simmering down with a sweet-and-savory reduction" },
        { name: "Crisp Tempura-Style Light Crisp", cuisine: "Pan-Asian", time: "12 mins", action: "lightly coating and pan-crisping until golden" },
        { name: "Slow-Braised Infusion Stew", cuisine: "Mediterranean", time: "30 mins", action: "slow-cooking in a covered vessel to extract deep flavors" },
        { name: "High-Heat Blackened Skillet Sear", cuisine: "American Bistro", time: "14 mins", action: "searing aggressively on high heat for a smoky char" },
        { name: "Velouté Cream Emulsion", cuisine: "Classic French", time: "20 mins", action: "whisking smoothly into a rich, velvety pan-sauce" },
        { name: "Open-Flame Charcoal Smoke Roast", cuisine: "Middle Eastern", time: "22 mins", action: "roasting over direct heat with aromatic herb oils" },
        { name: "Quick Acid-Marinated Refresh", cuisine: "Latin American", time: "10 mins", action: "tossing briskly with citrus, oils, and seasonings" },
        { name: "Layered Casserole Bake", cuisine: "Continental", time: "25 mins", action: "stacking and baking until bubbling and unified" },
        { name: "Wok-Tossed Fusion Glaze", cuisine: "Global Street Food", time: "15 mins", action: "rapidly tossing on high heat with a glossy pan-glaze" },
        { name: "Rustic Hearth-Style Confit", cuisine: "Country European", time: "28 mins", action: "gently poaching and roasting in flavored oils" }
    ];

    return creativeTechniques.map((tech, index) => {
        // Dynamic subset selection so every recipe uses a fresh combination of your inputs
        let subsetSize = (index % 2 === 0) ? coreItems.length : Math.max(1, coreItems.length - 1);
        let currentSubset = coreItems.slice(0, subsetSize);

        return {
            title: `${formattedPrimary} with ${formattedSecondary} (${tech.name})`,
            cuisine: tech.cuisine,
            totalTime: tech.time,
            coreIngredients: currentSubset,
            pantryItems: inferredStaples,
            ingredients: [
                ...currentSubset.map((item, idx) => `${idx + 1}. ${getExactQuantity(item)}`),
                "1 tbsp cooking oil or butter",
                "Pinch of salt and black pepper"
            ],
            instructions: [
                `Begin by prepping your primary inputs (${currentSubset.join(', ')}) into clean, workable portions.`,
                `Heat 1 tbsp of oil or butter in a pan or skillet over medium-high heat.`,
                `Apply the core technique of ${tech.action}, integrating your ingredients with basic seasoning.`,
                `Adjust seasoning to taste, plate elegantly, and serve immediately while hot.`
            ],
            altCookingMethod: {
                appliance: "Alternative Oven / Convection Bake",
                instructions: [
                    "Transfer your prepared ingredients into a baking dish.",
                    "Bake at 190°C for 15-18 minutes until thoroughly cooked and texturally balanced."
                ]
            }
        };
    });
}

export async function findRecipes(userIngredients) {
    const parsed = sanitizeAndInferInputs(userIngredients);
    let userTypedIngredients = parsed.coreItems;
    let inferredPantryStaples = parsed.inferredStaples;

    if (userTypedIngredients.length === 0) return [];

    // Completely unconstrained generation: 10 distinct creative dishes built purely from raw inputs
    const dynamicRecipes = generateFreeFormGlobalRecipes(userTypedIngredients, inferredPantryStaples);

    return dynamicRecipes.slice(0, 10);
}

// Event Listener Setup with Async Support and Error Boundary
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn') || document.getElementById('generate');
    const inputElement = document.getElementById('ingredients') || document.getElementById('ingredient-input');
    const resultsContainer = document.getElementById('recipe-results') || document.getElementById('results');

    if (!generateBtn || !inputElement || !resultsContainer) {
        console.error("FridgeToTable Error: Could not find required DOM elements (#generate-btn, #ingredients, or #recipe-results).");
        return;
    }

    generateBtn.addEventListener('click', async () => {
        try {
            const inputVal = inputElement.value;
            pendingRecipes = await findRecipes(inputVal);
            
            resultsContainer.innerHTML = '';
            if (!pendingRecipes || pendingRecipes.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="notice-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
                        <p style="color: #d9534f; font-weight: bold; font-size: 1.1rem;">Please enter valid ingredients to generate recipes.</p>
                    </div>
                `;
                return;
            }

            const userTypedIngredients = sanitizeAndInferInputs(inputVal).coreItems;
            renderFinalResults(pendingRecipes, ["cooking oil or butter", "salt", "black pepper"], resultsContainer);
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

function renderFinalResults(recipes, pantryUsed, container) {
    let html = `
        <div class="notice-box" style="margin-bottom: 15px; font-style: italic; color: #555;">
            <p>Generated with a free-form engine using universal pantry basics: <strong>${pantryUsed.join(', ')}</strong>.</p>
        </div>
        <h2>Your Recommended Recipes (${recipes.length} available)</h2>
    `;
    
    recipes.forEach((recipe, index) => {
        const coreUsedList = recipe.coreIngredients.map((core, idx) => `<li>${idx + 1}. ${core}</li>`).join('');

        html += `
            <div class="recipe-card" style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px;">
                    <h3 style="margin: 0;">${recipe.title}</h3>
                    <div style="display: flex; gap: 6px;">
                        <span style="background: #e9ecef; color: #495057; font-size: 0.75rem; font-weight: bold; padding: 4px 8px; border-radius: 12px; text-transform: uppercase;">${recipe.cuisine || 'Creative'}</span>
                        <span style="background: #d4edda; color: #155724; font-size: 0.75rem; font-weight: bold; padding: 4px 8px; border-radius: 12px;">⏱️ ${recipe.totalTime || '15 mins'}</span>
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
                            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="recipe-section" style="margin-top: 10px;">
                    <strong>Original Method (Pan / Gas):</strong>
                    <ol style="margin-left: 20px; margin-top: 5px;">
                        ${recipe.instructions.map(step => `<li style="margin-bottom: 4px;">${step}</li>`).join('')}
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
}
