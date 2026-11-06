// Expanded recipe database with original gas/pan methods and optional alternative appliance methods
const recipeDatabase = [
    {
        title: "Aloo Tomato Quick Curry",
        coreIngredients: ["potato", "tomato"],
        pantryItems: ["oil", "salt", "turmeric", "cumin"],
        ingredients: ["2 medium potatoes (boiled & cubed)", "2 ripe tomatoes (chopped)", "1 tbsp cooking oil", "1/2 tsp cumin seeds", "1/4 tsp turmeric powder", "Salt to taste"],
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
        ingredients: ["2 slices of bread", "1/2 cup grated cheese", "1 tbsp butter", "2 cloves minced garlic", "A pinch of dried oregano"],
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
        ingredients: ["2 eggs", "1 small tomato (diced)", "2 tbsp cheese (grated)", "1 tsp oil or butter", "Salt and pepper to taste"],
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
        ingredients: ["2 slices of bread", "1 tomato (finely chopped)", "1 small onion (chopped)", "1 green chilli (minced)", "1 tbsp oil", "Pinch of salt and turmeric"],
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
        title: "Quick Potato & Cheese Sandwich",
        coreIngredients: ["bread", "potato", "cheese"],
        pantryItems: ["butter", "chaat masala"],
        ingredients: ["2 bread slices", "1 boiled potato (mashed)", "2 slices or 3 tbsp cheese", "1 tbsp butter", "1/2 tsp chaat masala"],
        instructions: [
            "Season the mashed potato with salt and chaat masala, mixing well.",
            "Spread the seasoned potato over a bread slice and top with cheese, covering with the second slice.",
            "Apply butter on the outer side of the bread.",
            "Grill on a pan over medium flame for 2-3 minutes per side until golden brown and the cheese inside melts completely."
        ],
        altCookingMethod: {
            appliance: "OTG / Oven Method",
            instructions: [
                "Assemble the sandwich with potatoes, cheese, and a light butter coat on the outside.",
                "Place on a baking tray inside an OTG preheated to 180°C.",
                "Bake/grill for 4-5 minutes on each side until golden and the cheese inside is gooey and melted."
            ]
        }
    }
];

// Helper to randomize array selection
function getRandomRecipes(arr, count = 3) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

let pendingRecipes = [];
let allPantryItems = [];

export function findRecipes(userIngredients) {
    const cleanedInput = userIngredients.toLowerCase().split(',').map(i => i.trim()).filter(Boolean);
    if (cleanedInput.length === 0) return [];

    const matched = recipeDatabase.filter(recipe => {
        return recipe.coreIngredients.some(ing => cleanedInput.includes(ing));
    });

    return getRandomRecipes(matched, 3);
}

// Event Listener Setup
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    if (!generateBtn) return;

    generateBtn.addEventListener('click', () => {
        const inputVal = document.getElementById('ingredients').value;
        const resultsContainer = document.getElementById('recipe-results');
        
        pendingRecipes = findRecipes(inputVal);
        
        resultsContainer.innerHTML = '';
        if (pendingRecipes.length === 0) {
            resultsContainer.innerHTML = '<p class="no-result">No matching recipes found with those ingredients. Try adding more like tomato, cheese, bread, or potato!</p>';
            return;
        }

        allPantryItems = [...new Set(pendingRecipes.flatMap(r => r.pantryItems))];

        const neverAskAgain = localStorage.getItem('pantryApprovedAlways') === 'true';

        if (neverAskAgain || allPantryItems.length === 0) {
            renderFinalResults(pendingRecipes, allPantryItems, resultsContainer);
        } else {
            showPantryCheck(resultsContainer);
        }
    });
});

function showPantryCheck(container) {
    container.innerHTML = `
        <div class="pantry-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
            <h3>Pantry & Masala Check</h3>
            <p>These recipes will use standard basic items: <strong>${allPantryItems.join(', ')}</strong>.</p>
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
        showPantrySelectionChecklist(container);
    });

    document.getElementById('pantry-opt-3').addEventListener('click', () => {
        localStorage.setItem('pantryApprovedAlways', 'true');
        renderFinalResults(pendingRecipes, allPantryItems, container);
    });
}

function showPantrySelectionChecklist(container) {
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
            <p>These recipes will use standard basic items: <strong>${pantryUsed.length > 0 ? pantryUsed.join(', ') : 'None'}</strong>.</p>
        </div>
        <h2>Your Recommended Recipes</h2>
    `;
    
    recipes.forEach((recipe, index) => {
        html += `
            <div class="recipe-card" style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                <h3>${recipe.title}</h3>
                
                <div class="recipe-section" style="margin-top: 10px;">
                    <strong>Ingredients & Quantities:</strong>
                    <ul style="margin-left: 20px; margin-top: 5px;">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
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
                e.target.textContent = `+ View ${pendingRecipes[idx].altCookingMethod.appliance}`;
                e.target.style.backgroundColor = '#6c757d';
            }
        });
    });
}
