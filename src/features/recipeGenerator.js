// src/features/recipeGenerator.js
// FridgeToTable - Autonomous Global Engine with Dynamic Pantry Filtering & Error-Safe Rendering

function sanitizeAndInferInputs(rawUserInput) {
    if (!rawUserInput || typeof rawUserInput !== 'string') {
        return { coreItems: [] };
    }

    let cleaned = rawUserInput.toLowerCase().trim();
    let tokens = cleaned.split(/[\s,]+/).filter(t => t.length > 0).map(t => t.replace(/s$/, ''));

    return {
        coreItems: [...new Set(tokens)]
    };
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

// Generates 10 deeply detailed, authentic global recipes utilizing user inputs organically
function generateAutonomousGlobalRecipes(coreItems) {
    const primary = coreItems[0] || 'Main Ingredient';
    const secondary = coreItems[1] || coreItems[0] || 'Secondary Item';
    
    const formattedPrimary = primary.charAt(0).toUpperCase() + primary.slice(1);
    const formattedSecondary = secondary.charAt(0).toUpperCase() + secondary.slice(1);

    return [
        {
            title: `Italian Tuscan Creamy ${formattedPrimary} & ${formattedSecondary} Bake`,
            cuisine: "Italian",
            totalTime: "30 mins",
            pantryItems: ["extra virgin olive oil", "garlic cloves", "parmesan cheese", "fresh basil leaves", "sea salt", "black pepper"],
            steps: [
                `Bring a large pot of salted water to a rolling boil and cook your base ingredients until al dente; drain and reserve 1/2 cup of starchy cooking water.`,
                `In a wide skillet, heat 1 tbsp of extra virgin olive oil over medium flame and gently sauté 3 minced garlic cloves until fragrant and lightly golden.`,
                `Incorporate your core ingredients (${coreItems.join(', ')}) into the skillet, searing proteins or vegetables for 4-5 minutes until developing a light caramel crust.`,
                `Reduce the heat to low and pour in dairy components (like curd, cream, or cheese) along with the reserved water, stirring continuously to build a glossy, unified emulsion.`,
                `Toss the cooked base directly into the creamy sauce, ensuring every single piece is thoroughly coated in the velvety texture.`,
                `Season generously with cracked black pepper and sea salt to taste, balancing the richness with acidity if needed.`,
                `Transfer the mixture into an oven-safe baking dish, top heavily with grated parmesan cheese and fresh basil leaves.`,
                `Bake in a preheated oven at 190°C for 10-12 minutes until the top is bubbling, golden-brown, and aromatic.`
            ],
            altCookingMethod: {
                appliance: "Stovetop Skillet Simmer (No Oven)",
                instructions: [
                    "Skip the oven bake by covering your skillet with a tight lid on low heat for 5 minutes.",
                    "Let the cheese melt completely into the sauce before tossing and serving directly from the pan."
                ]
            }
        },
        {
            title: `Middle Eastern Yogurt-Marinated ${formattedSecondary} & ${formattedPrimary} Skewer Bowl`,
            cuisine: "Middle Eastern",
            totalTime: "25 mins",
            pantryItems: ["plain yogurt or curd", "ground cumin", "paprika", "lemon juice", "garlic paste", "olive oil", "salt"],
            steps: [
                `In a mixing bowl, create an authentic Middle Eastern marinade by combining whisked curd (yogurt), 1 tbsp lemon juice, minced garlic, ground cumin, paprika, and salt.`,
                `Submerge your core ingredients (${coreItems.join(', ')}) thoroughly into the yogurt marinade, ensuring complete coverage.`,
                `Cover the bowl and let the ingredients rest at room temperature for 10 minutes to allow the natural acids to tenderize the textures.`,
                `Heat a heavy cast-iron grill pan over high heat with a drizzle of olive oil until smoking hot.`,
                `Place the marinated items onto the grill pan, letting them sear undisturbed for 4-5 minutes to develop dark, smoky char marks.`,
                `Flip carefully and cook for an additional 3-4 minutes until fully cooked through and wonderfully aromatic.`,
                `Remove from heat and let rest for 3 minutes so the internal juices redistribute evenly.`,
                `Serve warm accompanied by a drizzle of remaining marinade and fresh herbs.`
            ],
            altCookingMethod: {
                appliance: "OTG Broiler Method",
                instructions: [
                    "Thread or spread your marinated ingredients onto a lined baking tray.",
                    "Broil on the top rack of your OTG at 220°C for 10-12 minutes, turning once halfway through."
                ]
            }
        },
        {
            title: `Pan-Asian Sticky Garlic-Soy Wok Toss with ${formattedPrimary}`,
            cuisine: "Pan-Asian",
            totalTime: "15 mins",
            pantryItems: ["dark soy sauce", "sesame oil", "fresh ginger", "garlic", "green chilies", "cooking oil", "salt"],
            steps: [
                `Slice all core ingredients (${coreItems.join(', ')}) into uniform, bite-sized strips or cubes for rapid wok cooking.`,
                `In a small bowl, whisk together dark soy sauce, a splash of water, minced garlic, and grated fresh ginger to create your stir-fry sauce.`,
                `Place your wok or deep skillet over maximum heat until wisps of smoke begin to rise from the metal surface.`,
                `Add 1 tbsp of high-smoke cooking oil and swirl to coat the sides of the wok evenly.`,
                `Throw in your primary core ingredients first, flash-frying vigorously for 3-4 minutes while tossing constantly.`,
                `Add remaining ingredients and pour the prepared soy-ginger sauce directly down the hot sides of the wok.`,
                `Toss everything together on high heat for 2 minutes as the sauce bubbles, thickens, and glazes every component with a glossy finish.`,
                `Drizzle with a few drops of toasted sesame oil immediately before plating for an authentic aromatic punch.`
            ],
            altCookingMethod: {
                appliance: "High-Heat Sheet Pan Roast",
                instructions: [
                    "Toss ingredients with oil and sauce mixture directly on a pre-heated metal baking sheet.",
                    "Roast in your oven at 220°C for 8-10 minutes, tossing once at the halfway mark."
                ]
            }
        },
        {
            title: `Mexican Street-Style Spiced ${formattedSecondary} Skillet Hash`,
            cuisine: "Mexican",
            totalTime: "20 mins",
            pantryItems: ["chili powder or paprika", "ground cumin", "lime juice", "butter", "onion", "garlic", "salt", "black pepper"],
            steps: [
                `Dice all core components (${coreItems.join(', ')}) into small, even cubes so they cook at a synchronized rate.`,
                `Melt 1 tbsp of butter in a heavy-bottomed skillet over medium-high heat until foaming.`,
                `Add finely chopped onions and minced garlic, sautéing for 2 minutes until translucent and fragrant.`,
                `Introduce your diced core items into the skillet, spreading them into an even layer across the pan.`,
                `Allow the mixture to sear undisturbed for 4-5 minutes to build a deeply savory, caramelized crust on the bottom.`,
                `Season vigorously with chili powder, cumin, sea salt, and freshly cracked black pepper, then flip and toss.`,
                `Squeeze fresh lime juice directly over the sizzling skillet to deglaze the pan and lift all the flavorful browned bits.`,
                `Cook for an additional 3 minutes until tender and well-combined, then serve hot.`
            ],
            altCookingMethod: {
                appliance: "Cast-Iron Skillet Oven Roast",
                instructions: [
                    "Transfer your seasoned skillet directly into a preheated oven at 200°C.",
                    "Bake uncovered for 12-15 minutes until edges are crispy and browned."
                ]
            }
        },
        {
            title: `French Bistro Provençal Herb Braise with ${formattedPrimary}`,
            cuisine: "French",
            totalTime: "35 mins",
            pantryItems: ["dried French herbs", "butter", "olive oil", "garlic", "tomato", "salt", "black pepper"],
            steps: [
                `Pat all core ingredients (${coreItems.join(', ')}) completely dry with a paper towel to ensure a proper sear.`,
                `Heat 1 tbsp of butter and olive oil in a deep Dutch oven or heavy pot over medium heat.`,
                `Sear the primary ingredients on all sides for 4-5 minutes until golden brown, then temporarily remove them to a plate.`,
                `In the same pot, add sliced onions, crushed garlic, and chopped tomatoes, cooking down into a rustic base.`,
                `Return the seared ingredients to the pot and introduce dried or fresh French herbs (such as thyme, rosemary, or basil).`,
                `Pour in 1/2 cup of water or broth, scraping the bottom ofemy pot to release any accumulated flavors.`,
                `Clamp a heavy lid tightly onto the pot, reduce the heat to the lowest possible simmer, and braise undisturbed for 20 minutes.`,
                `Remove the lid, check seasoning, and let the sauce reduce slightly for 3 minutes before serving warm.`
            ],
            altCookingMethod: {
                appliance: "Low-Temperature Oven Braise",
                instructions: [
                    "Seal your heavy pot tightly with foil under the lid.",
                    "Bake in a preheated oven at 160°C for 30 minutes for a tender, slow-cooked bistro finish."
                ]
            }
        },
        {
            title: `Indian Punjabi Dhaba-Style Spicy ${formattedSecondary} Handi`,
            cuisine: "North Indian",
            totalTime: "25 mins",
            pantryItems: ["turmeric powder", "garam masala", "cumin seeds", "ginger-garlic paste", "onion", "tomato", "cooking oil", "salt"],
            steps: [
                `Heat 1 tbsp of cooking oil in a kadhai or heavy pan over medium flame, then crackle cumin seeds for 30 seconds.`,
                `Add finely chopped onions and ginger-garlic paste, sautéing patiently for 5 minutes until deeply golden brown.`,
                `Stir in chopped tomatoes, turmeric powder, and salt, cooking down the mixture until oil begins to separate from the masala.`,
                `Incorporate your core ingredients (${coreItems.join(', ')}) into the rich onion-tomato masala base, coating them thoroughly.`,
                `Pour in 1/2 cup of water, bring to a gentle bubble, and cover the pan with a tight-fitting lid.`,
                `Turn the heat down to low (sim) and let the dish simmer for 12-15 minutes so the core items absorb all the robust spices.`,
                `Remove the lid, sprinkle 1/2 tsp of aromatic garam masala over the top, and stir gently.`,
                `Garnish with fresh coriander leaves if available and serve piping hot.`
            ],
            altCookingMethod: {
                appliance: "Pressure Cooker Method",
                instructions: [
                    "Combine all ingredients and spices inside a pressure cooker with 1/3 cup water.",
                    "Cook on medium heat for 2-3 whistles, then allow natural pressure release before opening."
                ]
            }
        },
        {
            title: `Spanish Catalan Romesco-Style Roasted ${formattedPrimary} Skillet`,
            cuisine: "Spanish",
            totalTime: "22 mins",
            pantryItems: ["smoked paprika", "almonds or nuts", "olive oil", "garlic", "tomato", "salt", "black pepper"],
            steps: [
                `Prepare your core items (${coreItems.join(', ')}) by slicing them into manageable roasting sizes.`,
                `In a skillet with 1 tbsp of olive oil, gently sauté chopped tomatoes and garlic until softened and slightly charred.`,
                `Blend or mash the softened tomato-garlic mixture with a pinch of smoked paprika and salt to create a rich Catalan-inspired base.`,
                `Return the base to your skillet and bring to a gentle simmer over medium heat.`,
                `Add your main core ingredients directly into the simmering romesco sauce.`,
                `Cover the skillet and let simmer for 10-12 minutes, allowing the smoky paprika and garlic to penetrate deeply.`,
                `Stir gently halfway through to ensure even cooking and sauce reduction.`,
                `Plate while piping hot with a final drizzle of fresh olive oil.`
            ],
            altCookingMethod: {
                appliance: "OTG Tray Roast",
                instructions: [
                    "Toss all ingredients together with romesco sauce paste on a baking sheet.",
                    "Roast in your OTG at 190°C for 18 minutes until caramelized and tender."
                ]
            }
        },
        {
            title: `Greek Lemon-Herb Oregano ${formattedSecondary} Skillet Sauté`,
            cuisine: "Greek",
            totalTime: "18 mins",
            pantryItems: ["dried oregano", "lemon juice", "olive oil", "garlic", "salt", "black pepper"],
            steps: [
                `In a small mixing bowl, whisk together 2 tbsp extra virgin olive oil, fresh lemon juice, minced garlic, and dried oregano.`,
                `Place a skillet over medium-high heat and add your core ingredients (${coreItems.join(', ')}).`,
                `Sear the ingredients in the dry or lightly oiled pan for 4 minutes until exterior edges turn golden.`,
                `Pour the zesty lemon-oregano dressing directly over the sizzling contents of the skillet.`,
                `Reduce heat to medium and toss continuously for 5-6 minutes as the lemon juice reduces and creates a bright pan-sauce.`,
                `Season to taste with sea salt and cracked black pepper, ensuring a lively balance of acid and savory depth.`,
                `Remove from heat immediately to preserve the fresh citrus aroma.`,
                `Serve warm with crusty bread or grains.`
            ],
            altCookingMethod: {
                appliance: "Convection Oven Tray Bake",
                instructions: [
                    "Arrange ingredients on a lined baking tray and douse generously with the lemon-herb marinade.",
                    "Bake at 190°C for 15 minutes until zesty and tender."
                ]
            }
        },
        {
            title: `Japanese Izakaya-Style Butter-Soy ${formattedPrimary} Glaze`,
            cuisine: "Japanese",
            totalTime: "14 mins",
            pantryItems: ["soy sauce", "butter", "garlic", "sugar or honey", "cooking oil", "salt"],
            steps: [
                `Prepare a simple Japanese tare glaze by mixing 2 tbsp soy sauce, 1 tsp sugar or honey, and a splash of water in a small dish.`,
                `Heat 1 tbsp of oil in a wide skillet or pan over medium-high heat until hot.`,
                `Add your core ingredients (${coreItems.join(', ')}) and sear briskly for 4-5 minutes until properly browned.`,
                `Lower the heat to medium and drop 1 tbsp of butter and minced garlic directly into the center of the pan.`,
                `As the butter foams, spoon it continuously over your ingredients to infuse them with rich dairy flavor.`,
                `Pour the prepared soy tare glaze around the edges of the hot pan, letting it bubble up instantly.`,
                `Toss everything vigorously for 2 minutes as the glaze reduces into a sticky, lacquered coating over every piece.`,
                `Serve immediately while glossy and aromatic.`
            ],
            altCookingMethod: {
                appliance: "Oven Glaze Broil",
                instructions: [
                    "Brush the soy glaze and butter mixture over ingredients on a baking sheet.",
                    "Broil on high heat for 6-7 minutes until lacquered and caramelized."
                ]
            }
        },
        {
            title: `Continental Garlic Butter Herb Infused ${formattedPrimary} Roast`,
            cuisine: "Continental",
            totalTime: "20 mins",
            pantryItems: ["butter", "garlic", "dried herbs", "olive oil", "salt", "black pepper"],
            steps: [
                `Preheat your pan or skillet over medium heat and melt 2 tablespoons of butter alongside 1 tbsp olive oil.`,
                `Incorporate minced garlic and dried herbs, letting them bloom in the warm butter for 45 seconds without burning.`,
                `Add your core ingredients (${coreItems.join(', ')}) directly into the herb-butter bath.`,
                `Sauté and toss the ingredients frequently for 8-10 minutes, ensuring even heat distribution and golden browning.`,
                `Season with a balanced pinch of salt and black pepper, tasting to ensure proper flavor depth.`,
                `Turn off the heat and let the dish rest for 2 minutes in the residual pan warmth.`,
                `Plate neatly, spooning any remaining garlic-herb butter from the pan over the top.`
            ],
            altCookingMethod: {
                appliance: "OTG Baking Tray Method",
                instructions: [
                    "Toss ingredients thoroughly in melted garlic butter and herbs on a baking tray.",
                    "Bake at 190°C for 15-18 minutes until roasted crisp and fragrant."
                ]
            }
        }
    ];
}

// Dynamically extracts required pantry items and filters out anything the user already typed as core ingredients
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

    const dynamicRecipes = generateAutonomousGlobalRecipes(userTypedIngredients);
    return dynamicRecipes.slice(0, 10);
}

// Event Listener Setup with Error Boundaries & Safe Pantry Check Flow
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
            
            // If user input already covers everything or pantry approved, skip straight to rendering
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
                <p>Recipes synthesized using active pantry items: <strong>${pantryUsed && pantryUsed.length > 0 ? pantryUsed.join(', ') : 'None'}</strong>.</p>
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
