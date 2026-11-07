// Expanded recipe database ensuring up to 10 diverse recipes can be generated
const recipeDatabase = [
    {
        title: "Aloo Tomato Quick Curry",
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
    },
    {
        title: "Tomato Cheese Omelette",
        coreIngredients: ["egg", "tomato", "cheese"],
        pantryItems: ["oil", "salt", "black pepper"],
        ingredients: ["1. 2 eggs", "2. 1 small tomato (diced)", "3. 2 tbsp cheese (grated)", "1 tsp oil or butter", "Salt and pepper to taste"],
        instructions: [
            "Whisk the eggs in a bowl thoroughly with salt and black pepper.",
            "Heat 1 tsp oil in a pan on medium flame for 30 seconds, then pour in the egg mixture.",
            "Cook on medium flame for 2 minutes until the edges begin to set.",
            "Scatter the diced tomatoes and grated cheese on one half, fold over, cook on low flame (sim) for 1 more minute, and serve."
        ],
        altCookingMethod: null
    },
    {
        title: "Spicy Masala Bread Toast",
        coreIngredients: ["bread", "tomato"],
        pantryItems: ["onion", "oil", "green chilli", "turmeric"],
        ingredients: ["1. 2 slices of bread", "2. 1 tomato (finely chopped)", "1 small onion (chopped)", "1 green chilli (minced)", "1 tbsp oil", "Pinch of salt and turmeric"],
        instructions: [
            "Heat 1 tbsp oil in a pan on medium flame, then sauté chopped onions and green chillies for 2 minutes until translucent.",
            "Add chopped tomatoes, turmeric, and salt. Cook on medium flame for 3-4 minutes down into a thick paste.",
            "Spread this spicy tomato mixture evenly over your bread slices.",
            "Place the slices back on the pan on low-to-medium flame for 2-3 minutes until the bottom crust is crisp and golden brown."
        ],
        altCookingMethod: {
            appliance: "OTG / Oven Method",
            instructions: [
                "Prepare the onion-tomato masala paste in a pan as usual.",
                "Spread the masala evenly over the bread slices and top with a tiny dash of oil or butter.",
                "Place them in a preheated OTG at 190°C for 5-6 minutes until toasted crisp and golden."
            ]
        }
    },
    {
        title: "Tomato Cheese Skillet Melt",
        coreIngredients: ["tomato", "cheese"],
        pantryItems: ["butter", "garlic", "black pepper"],
        ingredients: ["1. 2 ripe tomatoes (sliced thick)", "2. 1/2 cup grated cheese", "1 tbsp butter", "1 clove minced garlic", "Crushed black pepper to taste"],
        instructions: [
            "Melt butter in a pan on medium flame and sauté minced garlic for 30 seconds.",
            "Place thick tomato slices flat on the pan and sear for 2 minutes.",
            "Cover generously with grated cheese and black pepper.",
            "Cover with a lid, turn flame to low (sim), and cook for 3 minutes until the cheese is melted and bubbly."
        ],
        altCookingMethod: {
            appliance: "OTG / Oven Method",
            instructions: [
                "Arrange thick tomato slices on a baking tray, top with garlic butter, cheese, and pepper.",
                "Bake in an OTG preheated to 180°C for 6-8 minutes until bubbly and golden."
            ]
        }
    },
    {
        title: "Healthy Chicken & Lettuce Salad Bowl",
        coreIngredients: ["chicken", "lettuce"],
        pantryItems: ["olive oil", "lemon juice", "salt", "black pepper"],
        ingredients: ["1. 150g chicken breast (cubed)", "2. 2 cups fresh lettuce leaves (washed & chopped)", "1 tbsp olive oil", "1 tsp lemon juice", "Salt and crushed black pepper to taste"],
        instructions: [
            "Heat olive oil in a pan on medium flame, add chicken cubes, salt, and pepper.",
            "Sauté on medium flame for 6-8 minutes until fully cooked, golden, and tender.",
            "In a large bowl, toss the fresh chopped lettuce with lemon juice.",
            "Top the bed of crunchy lettuce with your warm, seasoned chicken chunks and serve fresh."
        ],
        altCookingMethod: {
            appliance: "OTG / Oven Method",
            instructions: [
                "Marinate chicken cubes with olive oil, salt, and pepper.",
                "Place on a baking tray and bake in an OTG preheated to 190°C for 12-15 minutes until juicy and cooked through.",
                "Serve warm over fresh lettuce leaves."
            ]
        }
    },
    {
        title: "Chicken & Potato Homestyle Curry",
        coreIngredients: ["chicken", "potato", "tomato"],
        pantryItems: ["oil", "onion", "garlic", "turmeric", "salt"],
        ingredients: ["1. 200g chicken pieces", "2. 2 medium potatoes (peeled & halved)", "3. 1 tomato (chopped)", "1 onion (chopped)", "1 tbsp oil", "1 tsp garlic paste", "1/2 tsp turmeric and salt to taste"],
        instructions: [
            "Heat oil in a pan on medium flame, sauté chopped onions and garlic paste for 2-3 minutes until golden.",
            "Add chopped tomatoes and turmeric, cooking on medium flame for 3 minutes until soft.",
            "Toss in the chicken pieces and potato halves, searing them in the masala for 4 minutes.",
            "Add 1 cup water, cover with a lid, turn flame to low (sim), and simmer for 15-18 minutes until chicken and potatoes are tender."
        ],
        altCookingMethod: null
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

// Precise culinary quantity mapper so ingredients never say "Standard portion of..."
function getExactQuantity(ingredient) {
    const ing = ingredient.toLowerCase().trim();
    if (ing.includes('paneer')) return '200g paneer (cubed)';
    if (ing.includes('curd') || ing.includes('yogurt')) return '1/2 cup curd (whisked smooth)';
    if (ing.includes('turmeric')) return '1/4 tsp turmeric powder';
    if (ing.includes('chicken')) return '200g chicken pieces';
    if (ing.includes('potato')) return '2 medium potatoes (diced)';
    if (ing.includes('tomato')) return '2 ripe tomatoes (chopped)';
    if (ing.includes('bread')) return '2 slices of bread';
    if (ing.includes('cheese')) return '1/2 cup grated cheese';
    if (ing.includes('egg')) return '2 whole eggs';
    if (ing.includes('noodles')) return '150g noodles (boiled)';
    if (ing.includes('rice')) return '1 cup basmati rice';
    if (ing.includes('onion')) return '1 medium onion (finely chopped)';
    if (ing.includes('garlic')) return '3 cloves garlic (minced)';
    if (ing.includes('oil') || ing.includes('butter')) return '1 tbsp cooking oil or butter';
    if (ing.includes('salt')) return 'Salt to taste';
    return `1 portion of ${ingredient}`;
}

// Generates up to 10 distinct dynamic recipes using flexible subsets and precise quantities
function generateTenDynamicRecipes(coreItems, inferredStaples) {
    const styles = [
        "Skillet Sauté", "Homestyle Simmer", "Pan Toss & Roast", "Creamy Masala Gravy", 
        "Pepper Fry Style", "Tandoori Spice Bake", "Dhaba Style Masakali", "Butter Garlic Roast", 
        "Quick Comfort Stew", "Classic Fusion Casserole"
    ];

    return styles.map((style, index) => {
        // Create flexible subsets: rotate through subsets of core items (e.g., all items, or subsets of 1-2 items)
        let subsetSize = (index % 2 === 0) ? coreItems.length : Math.max(1, coreItems.length - 1);
        let currentSubset = coreItems.slice(0, subsetSize);
        
        const primaryCore = currentSubset[0] || coreItems[0] || 'Item';
        const formattedCoreName = primaryCore.charAt(0).toUpperCase() + primaryCore.slice(1);

        return {
            title: `${formattedCoreName} & ${style}`,
            coreIngredients: currentSubset,
            pantryItems: inferredStaples.slice(0, 4),
            ingredients: [
                ...currentSubset.map((item, idx) => `${idx + 1}. ${getExactQuantity(item)}`),
                ...(inferredStaples.length > 0 ? inferredStaples.slice(0, 3).map(staple => getExactQuantity(staple)) : ["1 tbsp cooking oil", "Salt to taste"])
            ],
            instructions: [
                `Prep and clean your selected core ingredients (${currentSubset.join(', ')}).`,
                `Heat 1 tbsp of oil or butter in a pan on medium flame for 1 minute.`,
                `Add aromatics and spices (${inferredStaples.slice(0, 3).join(', ') || 'salt and pepper'}), sautéing for 2 minutes until fragrant.`,
                `Toss in your core items and cook on medium-high flame for 5-7 minutes until tender, well-coated, and delicious.`
            ],
            altCookingMethod: {
                appliance: "OTG / Microwave Method",
                instructions: [
                    "Combine your ingredients and seasoning in a microwave-safe or oven-safe dish.",
                    "Cover lightly and cook on high power or bake at 180°C for 8-10 minutes until done."
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

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    if (!generateBtn) return;

    generateBtn.addEventListener('click', () => {
        const inputVal = document.getElementById('ingredients').value;
        const resultsContainer = document.getElementById('recipe-results');
        
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
                <h3>${recipe.title}</h3>
                
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
