// Expanded recipe database ensuring up to 3 diverse recipes can be generated
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
        title: "Tomato Cheese Skillet Melt",
        coreIngredients: ["tomato", "cheese"],
        pantryItems: ["butter", "garlic", "black pepper"],
        ingredients: ["2 ripe tomatoes (sliced thick)", "1/2 cup grated cheese", "1 tbsp butter", "1 clove minced garlic", "Crushed black pepper to taste"],
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
        ingredients: ["150g chicken breast (cubed)", "2 cups fresh lettuce leaves (washed & chopped)", "1 tbsp olive oil", "1 tsp lemon juice", "Salt and crushed black pepper to taste"],
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
        ingredients: ["200g chicken pieces", "2 medium potatoes (peeled & halved)", "1 tomato (chopped)", "1 onion (chopped)", "1 tbsp oil", "1 tsp garlic paste", "1/2 tsp turmeric and salt to taste"],
        instructions: [
            "Heat oil in a pan on medium flame, sauté chopped onions and garlic paste for 2-3 minutes until golden.",
            "Add chopped tomatoes and turmeric, cooking on medium flame for 3 minutes until soft.",
            "Toss in the chicken pieces and potato halves, searing them in the masala for 4 minutes.",
            "Add 1 cup water, cover with a lid, turn flame to low (sim), and simmer for 15-18 minutes until chicken and potatoes are tender."
        ],
        altCookingMethod: null
    }
];

// Helper to randomize array selection (up to 3)
function getRandomRecipes(arr, count = 3) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

let pendingRecipes = [];
let userTypedIngredients = [];

export function findRecipes(userIngredients) {
    userTypedIngredients = userIngredients.toLowerCase().split(',').map(i => i.trim()).filter(Boolean);
    if (userTypedIngredients.length === 0) return [];

    const matched = recipeDatabase.filter(recipe => {
        return recipe.coreIngredients.some(ing => userTypedIngredients.includes(ing));
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
            resultsContainer.innerHTML = `
                <div class="notice-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center;">
                    <p style="color: #d9534f; font-weight: bold; font-size: 1.1rem;">Unfortunately, a proper meal can't be made from this.</p>
                    <p style="color: #555; margin-top: 8px;">Please include core food items (like chicken, bread, eggs, tomatoes, or potatoes) and try again!</p>
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
    // Generate a small pool of extra common core items to suggest alongside missing ones (e.g., bread, eggs, potatoes, cheese, chicken)
    const commonExtras = ["bread", "eggs", "potato", "cheese", "chicken", "tomato"];
    const extraSuggestions = commonExtras.filter(item => !userTypedIngredients.includes(item) && !missingItems.includes(item)).slice(0, 3);
    const combinedChecklistItems = [...missingItems, ...extraSuggestions];

    container.innerHTML = `
        <div class="pantry-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
            <h3>Core Items Check</h3>
            <p>Do you have these core items available to unlock more recipe options?</p>
            <div style="display: flex; flex-direction: column; gap: 8px; margin: 15px 0;">
                ${combinedChecklistItems.map(item => `
                    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                        <input type="checkbox" class="core-checkbox" value="${item}" ${missingItems.includes(item) ? 'checked' : ''} style="width: 18px; height: 18px;">
                        <span style="text-transform: capitalize;">${item}</span>
                    </label>
                `).join('')}
            </div>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button id="confirm-core-items" style="background-color: #28a745; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; flex: 1;">Continue with Selected Items</button>
            </div>
        </div>
    `;

    document.getElementById('confirm-core-items').addEventListener('click', () => {
        const checkboxes = container.querySelectorAll('.core-checkbox');
        const userHasCore = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const finalAvailableCores = [...userTypedIngredients, ...userHasCore];

        const validRecipes = pendingRecipes.filter(recipe => {
            return recipe.coreIngredients.every(core => finalAvailableCores.includes(core));
        });

        if (validRecipes.length === 0) {
            container.innerHTML = `
                <div class="notice-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px
