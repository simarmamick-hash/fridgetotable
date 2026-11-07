// src/features/recipeGenerator.js
// FridgeToTable - Smart Recipe Generation Engine (10-Recipe Scale, Multi-Cuisine, Precise Quantities)

const recipeDatabase = [
    {
        title: "Aloo Tomato Quick Curry",
        cuisine: "Indian Regional",
        coreIngredients: ["potato", "tomato"],
        pantryItems: ["oil", "salt", "turmeric", "cumin"],
        ingredients: ["1. 2 medium potatoes (boiled & cubed)", "2. 2 ripe tomatoes (chopped)", "1 tbsp cooking oil", "1/2 tsp cumin seeds", "1/4 tsp turmeric powder", "Salt to taste"],
        instructions: [
            "Heat 1 tbsp oil in a pan on medium flame for 1 minute, then crackle the cumin seeds.",
            "Add chopped tomatoes, turmeric, and salt. Sauté on medium flame for 3-4 minutes until soft and pulpy.",
            "Toss in the cubed potatoes and mix well with the gravy.",
            "Cover the pan with a lid, turn the flame to low (sim), and simmer for 5 minutes before serving hot."
        ],
        altCookingMethod: {
            appliance: "Microwave Method",
            instructions: [
                "In a microwave-safe bowl, combine oil, cumin seeds, chopped tomatoes, turmeric, and salt.",
                "Cover and microwave on high for 3 minutes until tomatoes are soft.",
                "Stir in the boiled cubed potatoes and 2 tbsp water.",
                "Microwave uncovered on high for 3-4 minutes, stirring halfway through, until hot and well blended."
            ]
        }
    },
    {
        title: "Cheesy Garlic Bread Slice",
        cuisine: "Continental",
        coreIngredients: ["bread", "cheese"],
        pantryItems: ["butter", "garlic", "oregano"],
        ingredients: ["1. 2 slices of bread", "2. 1/2 cup grated cheese", "1 tbsp butter", "2 cloves minced garlic", "A pinch of dried oregano"],
        instructions: [
            "Mix the softened butter with minced garlic in a small bowl.",
            "Spread the garlic butter evenly across one side of each bread slice.",
            "Top generously with grated cheese and a pinch of dried oregano.",
            "**Pan Method:** Place on a pan over low flame (sim), cover with a lid, and cook for 3-4 minutes until the cheese is completely melted and bubbling."
        ],
        altCookingMethod: {
            appliance: "OTG / Oven Method",
            instructions: [
                "Preheat your OTG or oven at 180°C for 5 minutes.",
                "Place the prepared garlic and cheese bread slices on a lined baking tray.",
                "Bake at 180°C for 5-7 minutes until the edges are crisp and the cheese is melted, golden, and bubbling."
            ]
        }
    }
];

const PANTRY_INFERENCES = {
    curd: ['besan (gram flour)', 'turmeric', 'cumin seeds', 'mustard seeds', 'garlic'],
    yogurt: ['besan (gram flour)', 'turmeric', 'cumin seeds'],
    beef: ['onion', 'garlic', 'cooking oil or butter', 'salt', 'black pepper'],
    chicken: ['onion', 'garlic', 'ginger', 'cooking oil', 'basic spices'],
    potato: ['salt', 'black pepper', 'cooking oil', 'cumin or paprika'],
    paneer: ['butter or oil', 'garam masala', 'tomato', 'onion', 'ginger-garlic paste'],
    noodles: ['soy sauce', 'garlic', 'green chilies', 'cooking oil'],
    rice: ['cumin seeds (jeera)', 'onion', 'ghee or oil', 'basic spices'],
    pasta: ['garlic', 'olive oil or butter', 'chili flakes', 'cheese or herbs'],
    tomato: ['garlic', 'onion', 'olive oil or cooking oil', 'salt', 'black pepper'],
    turmeric: ['cumin seeds', 'coriander powder', 'oil', 'salt']
};

function sanitizeAndInferInputs(rawUserInput) {
    if (!rawUserInput || typeof rawUserInput !== 'string') {
        return { coreItems: [], inferredStaples: [] };
    }

    let cleaned = rawUserInput.toLowerCase().trim();
    let tokens = cleaned.split(/[\s,]+/).filter(t => t.length > 0).map(t => t.replace(/s$/, ''));
    let inferredAdditions = [];

    for (let token of tokens) {
        if (PANTRY_INFERENCES[token]) {
            inferredAdditions.push(...PANTRY_INFERENCES[token]);
        }
    }

    return {
        coreItems: [...new Set(tokens)],
        inferredStaples: [...new Set(inferredAdditions)]
    };
}

// Exact culinary quantity lookup dictionary (Zero placeholders!)
function getExactQuantity(item) {
    const cleanItem = item.toLowerCase().trim();
    if (cleanItem.includes('paneer')) return '200g paneer (cubed)';
    if (cleanItem.includes('curd') || cleanItem.includes('yogurt')) return '1/2 cup curd (whisked smooth)';
    if (cleanItem.includes('turmeric')) return '1/4 tsp turmeric powder';
    if (cleanItem.includes('chicken')) return '200g chicken pieces';
    if (cleanItem.includes('potato')) return '2 medium potatoes (diced)';
    if (cleanItem.includes('tomato')) return '2 ripe tomatoes (chopped)';
    if (cleanItem.includes('bread')) return '2 slices of bread';
    if (cleanItem.includes('cheese')) return '1/2 cup grated cheese';
    if (cleanItem.includes('egg')) return '2 whole eggs';
    if (cleanItem.includes('noodles')) return '150g noodles (boiled)';
    if (cleanItem.includes('rice')) return '1 cup basmati rice';
    if (cleanItem.includes('beef')) return '200g beef strips';
    if (cleanItem.includes('lettuce')) return '2 cups fresh lettuce';
    if (cleanItem.includes('onion')) return '1 medium onion (finely chopped)';
    if (cleanItem.includes('garlic')) return '3 cloves garlic (minced)';
    if (cleanItem.includes('oil') || cleanItem.includes('butter')) return '1 tbsp cooking oil or butter';
    if (cleanItem.includes('salt')) return 'Salt to taste';
    if (cleanItem.includes('cumin')) return '1/2 tsp cumin seeds';
    return `100g ${item}`;
}

// Generates up to 10 distinct dynamic recipes across Indian, Chinese, and Continental cuisines
function generateTenDynamicRecipes(coreItems, inferredStaples) {
    const cuisineStyles = [
        { name: "North Indian Dhaba Style Gravy", cuisine: "North Indian" },
        { name: "Indo-Chinese Garlic Wok Stir-Fry", cuisine: "Chinese Fusion" },
        { name: "Continental Creamy Skillet Bake", cuisine: "Continental" },
        { name: "Royal Mughlai White Korma", cuisine: "Mughlai Indian" },
        { name: "South Indian Pepper Fry", cuisine: "South Indian" },
        { name: "Tandoori Spice Roasted Casserole", cuisine: "Indo-Continental" },
        { name: "Classic Home-Style Simmer", cuisine: "Indian Comfort" },
        { name: "Street-Style Spicy Toss", cuisine: "Fast Fusion" },
        { name: "Herb & Butter Skillet Roast", cuisine: "Continental Fusion" },
        { name: "Traditional Regional Handi", cuisine: "Traditional Indian" }
    ];

    return cuisineStyles.map((styleObj, index) => {
        let subsetSize = (index % 3 === 0) ? coreItems.length : Math.max(1, (index % coreItems.length) + 1);
        let currentSubset = coreItems.slice(0, subsetSize);

        const primaryCore = currentSubset[0] || coreItems[0] || 'Special';
        const formattedCoreName = primaryCore.charAt(0).toUpperCase() + primaryCore.slice(1);

        return {
            title: `${formattedCoreName} ${styleObj.name}`,
            cuisine: styleObj.cuisine,
            coreIngredients: currentSubset,
            pantryItems: inferredStaples.slice(0, 4),
            ingredients: [
                ...currentSubset.map((item, idx) => `${idx + 1}. ${getExactQuantity(item)}`),
                ...(inferredStaples.length > 0 ? inferredStaples.slice(0, 3).map(staple => getExactQuantity(staple)) : ["1 tbsp cooking oil", "Salt to taste"])
            ],
            instructions: [
                `Prep and measure your core subset ingredients (${currentSubset.join(', ')}).`,
                `Heat 1 tbsp of cooking oil or butter in a pan or wok on medium flame for 1 minute.`,
                `Sauté your aromatics and spices (${inferredStaples.slice(0, 2).join(', ') || 'garlic and cumin'}) until fragrant.`,
                `Toss in your core ingredients and cook on medium-high flame or simmer on low for 6-8 minutes until tender and flavorful.`
            ],
            altCookingMethod: {
                appliance: "OTG / Microwave Convection Method",
                instructions: [
                    "Combine the prepared ingredients and spices in a greased baking or microwave-safe dish.",
                    "Bake in your preheated OTG at 190°C or microwave on high power for 8-10 minutes until bubbling and fully cooked."
                ]
            }
        };
    });
}

let pendingRecipes = [];
let userTypedIngredients = [];
let inferredPantryStaples = [];

export function findRecipes(userIngredients) {
    const parsed = sanitizeAndInferInputs(userIngredients);
    userTypedIngredients = parsed.coreItems;
    inferredPantryStaples = parsed.inferredStaples;

    if (userTypedIngredients.length === 0) return [];

    let matched = recipeDatabase.filter(recipe => {
        return recipe.coreIngredients.some(ing => userTypedIngredients.includes(ing));
    });

    const dynamicRecipes = generateTenDynamicRecipes(userTypedIngredients, inferredPantryStaples);
    const combinedPool = [...matched, ...dynamicRecipes];

    return combinedPool.slice(0, 10);
}

// Event Listener Setup with Error Boundary Debugging
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn') || document.getElementById('generate');
    const inputElement = document.getElementById('ingredients') || document.getElementById('ingredient-input');
    const resultsContainer = document.getElementById('recipe-results') || document.getElementById('results');

    if (!generateBtn || !inputElement || !resultsContainer) {
        console.error("FridgeToTable Error: Could not find required DOM elements (#generate-btn, #ingredients, or #recipe-results).");
        return;
    }

    generateBtn.addEventListener('click', () => {
        try {
            const inputVal = inputElement.value;
            pendingRecipes = findRecipes(inputVal);
            
            resultsContainer.innerHTML = '';
            if (pendingRecipes.length === 0) {
                resultsContainer.innerHTML = `
                    <div class="notice-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
                        <p style="color: #d9534f; font-weight: bold; font-size: 1.1rem;">Please enter valid ingredients to generate recipes.</p>
                    </div>
                `;
                return;
            }

            const requiredCoreItems = [...new Set(pendingRecipes.flatMap(r => r.coreIngredients))];
            const missingCoreItems = requiredCoreItems.filter(item => !userTypedIngredients.includes(item));

            if (missingCoreItems.length > 0) {
                showCoreItemsCheck(resultsContainer, missingCoreItems);
            } else {
                showPantryCheck(resultsContainer, userTypedIngredients);
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

function showCoreItemsCheck(container, missingItems) {
    const pool = ["bread", "eggs", "potato", "cheese", "chicken", "tomato", "rice", "onion", "lettuce"];
    const dynamicExtras = pool.filter(item => 
        !userTypedIngredients.includes(item) && !missingItems.includes(item)
    ).slice(0, 2);

    const combinedSuggestions = [...new Set([...missingItems, ...dynamicExtras])];

    container.innerHTML = `
        <div class="pantry-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
            <h3>Core Items Check</h3>
            <p>Do you have the missing core items required for these recipes (like <strong>${missingItems.join(', ')}</strong>)?</p>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button id="core-opt-yes" style="background-color: #28a745; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; flex: 1;">1. Yes, I have all</button>
                <button id="core-opt-no" style="background-color: #ffc107; color: #333; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; flex: 1;">2. I don't have some</button>
            </div>
        </div>
    `;

    document.getElementById('core-opt-yes').addEventListener('click', () => {
        showPantryCheck(container, [...userTypedIngredients, ...missingItems]);
    });

    document.getElementById('core-opt-no').addEventListener('click', () => {
        showCoreSelectionChecklist(container, combinedSuggestions);
    });
}

function showCoreSelectionChecklist(container, suggestions) {
    container.innerHTML = `
        <div class="pantry-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
            <h3>Select the Core Items You Have</h3>
            <p>Check which of these core items you currently own:</p>
            <div style="display: flex; flex-direction: column; gap: 8px; margin: 15px 0;">
                ${suggestions.map(item => `
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" class="core-checkbox" value="${item}" checked style="width: 18px; height: 18px;">
                        <span style="text-transform: capitalize;">${item}</span>
                    </label>
                `).join('')}
            </div>
            <button id="confirm-core-items" style="background-color: #007bff; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; width: 100%;">Continue with Selected</button>
        </div>
    `;

    document.getElementById('confirm-core-items').addEventListener('click', () => {
        const checkboxes = container.querySelectorAll('.core-checkbox');
        const userHasCore = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const finalAvailableCores = [...userTypedIngredients, ...userHasCore];
        pendingRecipes = findRecipes(finalAvailableCores.join(', '));
        showPantryCheck(container, finalAvailableCores);
    });
}

function showPantryCheck(container, availableCores) {
    const allPantryItems = [...new Set([...pendingRecipes.flatMap(r => r.pantryItems), ...inferredPantryStaples])];
    const neverAskAgain = localStorage.getItem('pantryApprovedAlways') === 'true';

    if (neverAskAgain || allPantryItems.length === 0) {
        renderFinalResults(pendingRecipes, allPantryItems, container);
        return;
    }

    container.innerHTML = `
        <div class="pantry-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
            <h3>Pantry & Masala Check</h3>
            <p>These recipes require standard items: <strong>${allPantryItems.join(', ')}</strong>.</p>
            <p>Do you have and approve using these?</p>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <button id="pantry-opt-1" style="background-color: #28a745; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">1. Yes, I have them</button>
                <button id="pantry-opt-2" style="background-color: #ffc107; color: #333; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">2. No, I don't have some of these</button>
                <button id="pantry-opt-3" style="background-color: #007bff; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">3. Yes, I have them and never ask me again</button>
            </div>
        </div>
    `;

    document.getElementById('pantry-opt-1').addEventListener('click', () => {
        renderFinalResults(pendingRecipes, allPantryItems, container);
    });

    document.getElementById('pantry-opt-2').addEventListener('click', () => {
        showPantrySelectionChecklist(container, allPantryItems);
    });

    document.getElementById('pantry-opt-3').addEventListener('click', () => {
        localStorage.setItem('pantryApprovedAlways', 'true');
        renderFinalResults(pendingRecipes, allPantryItems, container);
    });
}

function showPantrySelectionChecklist(container, allPantryItems) {
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
        const checkboxes = container.querySelectorAll('.pantry-checkbox');
        const userApprovedItems = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        renderFinalResults(pendingRecipes, userApprovedItems, container);
    });
}

function renderFinalResults(recipes, pantryUsed, container) {
    let html = `
        <div class="notice-box" style="margin-bottom: 15px; font-style: italic; color: #555;">
            <p>These recipes will use standard items: <strong>${pantryUsed.length > 0 ? pantryUsed.join(', ') : 'None'}</strong>.</p>
        </div>
        <h2>Your Recommended Recipes (${recipes.length} available)</h2>
    `;
    
    recipes.forEach((recipe, index) => {
        const coreUsedList = recipe.coreIngredients.map((core, idx) => `<li>${idx + 1}. ${core}</li>`).join('');

        html += `
            <div class="recipe-card" style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <h3 style="margin: 0;">${recipe.title}</h3>
                    <span style="background: #e9ecef; color: #495057; font-size: 0.75rem; font-weight: bold; padding: 4px 8px; border-radius: 12px; text-transform: uppercase;">${recipe.cuisine || 'Fusion'}</span>
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
