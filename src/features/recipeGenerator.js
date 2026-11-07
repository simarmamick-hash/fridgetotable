// src/features/recipeGenerator.js
// FridgeToTable - Fully Independent Global Engine with Unique Instructions & Interactive Pantry Check

function sanitizeAndInferInputs(rawUserInput) {
    if (!rawUserInput || typeof rawUserInput !== 'string') {
        return { coreItems: [], inferredStaples: [] };
    }

    let cleaned = rawUserInput.toLowerCase().trim();
    let tokens = cleaned.split(/[\s,]+/).filter(t => t.length > 0).map(t => t.replace(/s$/, ''));
    
    // Neutral pantry basics that the app will ask you to confirm
    let neutralPantryStaples = ['cooking oil or butter', 'salt', 'black pepper', 'garlic', 'onion'];

    return {
        coreItems: [...new Set(tokens)],
        inferredStaples: neutralPantryStaples
    };
}

function getExactQuantity(item) {
    const cleanItem = item.toLowerCase().trim();
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

// 100% Unique Procedural Generator: Each technique has completely different, detailed steps
function generateFreeFormGlobalRecipes(coreItems, inferredStaples) {
    const primary = coreItems[0] || 'Main Ingredient';
    const secondary = coreItems[1] || coreItems[0] || 'Secondary Item';
    const formattedPrimary = primary.charAt(0).toUpperCase() + primary.slice(1);
    const formattedSecondary = secondary.charAt(0).toUpperCase() + secondary.slice(1);

    const creativeTechniques = [
        {
            name: "Gastrique Reduction Glaze",
            cuisine: "Modern European",
            time: "18 mins",
            steps: [
                `Slice your core items (${coreItems.join(', ')}) into clean, bite-sized wedges.`,
                `In a small saucepan, combine 1 tbsp sugar and a splash of vinegar over medium heat until it forms a bubbling amber caramel.`,
                `Carefully introduce the core ingredients into the warm reduction, tossing vigorously to coat each piece in the glossy glaze.`,
                `Simmer on low heat for 5-7 minutes until the reduction clings tightly to the ingredients, then garnish with cracked black pepper.`
            ],
            appliance: "Oven Roast & Glaze",
            applianceSteps: [
                "Toss ingredients with a sweet-vinegar glaze mixture on a lined baking tray.",
                "Roast at 190°C for 15 minutes, brushing with pan juices halfway through."
            ]
        },
        {
            name: "Crisp Tempura-Style Light Fry",
            cuisine: "Pan-Asian",
            time: "12 mins",
            steps: [
                `Prepare a light batter by whisking flour with ice-cold water and a pinch of salt until smooth.`,
                `Heat 2 inches of cooking oil in a deep pan or wok until shimmering hot.`,
                `Dip the core ingredients (${coreItems.join(', ')}) lightly into the chilled batter, ensuring an even coat.`,
                `Gently drop them into the hot oil and fry in small batches for 3-4 minutes until golden and feather-light. Drain on paper towels.`
            ],
            appliance: "Air Fryer Crisp Method",
            applianceSteps: [
                "Lightly spray the battered ingredients with cooking oil.",
                "Air fry at 200°C for 10 minutes, shaking the basket halfway."
            ]
        },
        {
            name: "Slow-Braised Infusion Stew",
            cuisine: "Mediterranean",
            time: "30 mins",
            steps: [
                `In a heavy Dutch oven, heat olive oil and gently sweat diced onions and minced garlic until translucent.`,
                `Add your core components (${coreItems.join(', ')}) along with herbs and 1/2 cup of water or broth.`,
                `Bring the liquid to a gentle bubble, then clamp a heavy lid tightly onto the pot.`,
                `Reduce heat to the lowest setting and braise undisturbed for 20 minutes to let the deep, rustic flavors meld together.`
            ],
            appliance: "Covered Oven Braise",
            applianceSteps: [
                "Seal your Dutch oven tightly with aluminum foil and lid.",
                "Bake in a preheated oven at 160°C for 30 minutes until exceptionally tender."
            ]
        },
        {
            name: "High-Heat Blackened Skillet Sear",
            cuisine: "American Bistro",
            time: "14 mins",
            steps: [
                `Coat your core items (${coreItems.join(', ')}) generously with a dry rub of salt, pepper, and paprika.`,
                `Place a heavy cast-iron skillet over high heat and let it heat dry until smoking slightly.`,
                `Add 1 tbsp of butter or high-smoke oil directly into the screaming hot pan.`,
                `Press the ingredients firmly onto the skillet surface and sear aggressively for 3-4 minutes per side to build a smoky, charred crust.`
            ],
            appliance: "Oven Broiler Sear",
            applianceSteps: [
                "Place seasoned ingredients on the top rack directly under the oven broiler element.",
                "Broil at maximum heat for 6-8 minutes, turning once."
            ]
        },
        {
            name: "Velouté Cream Emulsion",
            cuisine: "Classic French",
            time: "20 mins",
            steps: [
                `Melt 1 tbsp butter in a saucepan over medium-low heat and stir in an equal amount of flour to form a light paste (roux).`,
                `Slowly whisk in warm milk or water bit by bit to prevent lumps, creating a smooth, velvety white base.`,
                `Fold your core ingredients (${coreItems.join(', ')}) directly into the simmering cream sauce.`,
                `Simmer gently on low heat for 8-10 minutes until the sauce thickens into a rich, luxurious coating.`
            ],
            appliance: "Baking Dish Casserole",
            applianceSteps: [
                "Pour the velouté sauce and ingredients into an oven-safe dish and top with cheese if desired.",
                "Bake at 180°C for 20 minutes until bubbling."
            ]
        },
        {
            name: "Open-Flame Charcoal Smoke Roast",
            cuisine: "Middle Eastern",
            time: "22 mins",
            steps: [
                `Marinate the core components (${coreItems.join(', ')}) with olive oil, garlic paste, and salt for 10 minutes.`,
                `Preheat your grill pan or skillet over medium-high flame until very hot.`,
                `Char the ingredients directly on the ridges for 5 minutes to create deep, smoky grill marks.`,
                `Finish by covering the pan with a lid for 4 minutes to trap the smoke and complete internal cooking.`
            ],
            appliance: "OTG Grill Mode",
            applianceSteps: [
                "Place marinated ingredients on the top wire rack of your OTG.",
                "Grill at 220°C for 10-12 minutes until charred and cooked through."
            ]
        },
        {
            name: "Quick Acid-Marinated Refresh",
            cuisine: "Latin American",
            time: "10 mins",
            steps: [
                `Finely chop or slice your core inputs (${coreItems.join(', ')}) into a refreshing bowl setup.`,
                `Drench the ingredients in fresh citrus juice (lime or lemon) combined with olive oil and sea salt.`,
                `Toss briskly and let the mixture rest at room temperature for 5 minutes so the citrus lightly cures and brightens the flavors.`,
                `Garnish with fresh herbs or chili flakes and serve chilled or at room temperature.`
            ],
            appliance: "Chilled Refrigerator Infusion",
            applianceSteps: [
                "Cover and chill the marinated bowl in the refrigerator for 15 minutes before serving for an extra refreshing crunch."
            ]
        },
        {
            name: "Layered Casserole Bake",
            cuisine: "Continental",
            time: "25 mins",
            steps: [
                `Grease an oven-safe baking dish lightly with butter or oil.`,
                `Layer your core items (${coreItems.join(', ')}) in structured rows, seasoning each layer lightly with salt and pepper.`,
                `Pour a small splash of water, milk, or broth around the edges of the dish to provide moisture during baking.`,
                `Bake uncovered at 190°C for 20-22 minutes until the top is golden and the core ingredients are tender.`
            ],
            appliance: "Microwave Convection Bake",
            applianceSteps: [
                "Cover the casserole dish with microwave-safe wrap or lid.",
                "Microwave on medium-high power for 10-12 minutes until fully cooked."
            ]
        },
        {
            name: "Wok-Tossed Fusion Glaze",
            cuisine: "Global Street Food",
            time: "15 mins",
            steps: [
                `Prep your wok by heating 1 tbsp of oil over maximum flame until wisps of smoke appear.`,
                `Throw in minced garlic and onions, flash-frying for 20 seconds.`,
                `Add the core ingredients (${coreItems.join(', ')}) and toss continuously using a tossing motion for 5 minutes.`,
                `Drizzle a savory pan-glaze over the top, tossing rapidly on high heat until glossy and caramelized.`
            ],
            appliance: "High-Heat Sheet Pan Toss",
            applianceSteps: [
                "Spread ingredients thinly on a pre-heated metal baking sheet.",
                "Roast in oven at 220°C for 8 minutes, tossing halfway."
            ]
        },
        {
            name: "Rustic Hearth-Style Confit",
            cuisine: "Country European",
            time: "28 mins",
            steps: [
                `Submerge your core items (${coreItems.join(', ')}) in a small pot with 3-4 tbsp of oil, garlic cloves, and a pinch of salt.`,
                `Set the heat to the absolute lowest setting—the oil should barely bubble (poach gently).`,
                `Cook slowly for 20-22 minutes until the ingredients become meltingly tender and infused with rich oil.`,
                `Remove gently with a slotted spoon and serve warm over toast or grains.`
            ],
            appliance: "Low-Temp Oven Confit",
            applianceSteps: [
                "Place ingredients and oil in a covered oven-safe ramekin.",
                "Bake at 130°C for 45 minutes for a traditional slow-melting confit texture."
            ]
        }
    ];

    return creativeTechniques.map((tech, index) => {
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
            instructions: tech.steps,
            altCookingMethod: {
                appliance: tech.appliance,
                instructions: tech.applianceSteps
            }
        };
    });
}

export async function findRecipes(userIngredients) {
    const parsed = sanitizeAndInferInputs(userIngredients);
    let userTypedIngredients = parsed.coreItems;
    let inferredPantryStaples = parsed.inferredStaples;

    if (userTypedIngredients.length === 0) return [];

    const dynamicRecipes = generateFreeFormGlobalRecipes(userTypedIngredients, inferredPantryStaples);
    return dynamicRecipes.slice(0, 10);
}

// Event Listener Setup with Interactive Pantry Check Restored
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
            
            // Re-introduce the interactive pantry approval check!
            showPantryCheck(resultsContainer, parsed.inferredStaples, pendingRecipes);
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
    const neverAskAgain = localStorage.getItem('pantryApprovedAlways') === 'true';

    if (neverAskAgain || allPantryItems.length === 0) {
        renderFinalResults(recipes, allPantryItems, container);
        return;
    }

    container.innerHTML = `
        <div class="pantry-box" style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
            <h3>Pantry & Masala Check</h3>
            <p>These recipes utilize standard basics: <strong>${allPantryItems.join(', ')}</strong>.</p>
            <p>Do you have and approve using these?</p>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <button id="pantry-opt-1" style="background-color: #28a745; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">1. Yes, I have them</button>
                <button id="pantry-opt-2" style="background-color: #ffc107; color: #333; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">2. No, I don't have some of these</button>
                <button id="pantry-opt-3" style="background-color: #007bff; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer;">3. Yes, I have them and never ask me again</button>
            </div>
        </div>
    `;

    document.getElementById('pantry-opt-1').addEventListener('click', () => {
        renderFinalResults(recipes, allPantryItems, container);
    });

    document.getElementById('pantry-opt-2').addEventListener('click', () => {
        showPantrySelectionChecklist(container, allPantryItems, recipes);
    });

    document.getElementById('pantry-opt-3').addEventListener('click', () => {
        localStorage.setItem('pantryApprovedAlways', 'true');
        renderFinalResults(recipes, allPantryItems, container);
    });
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
        const checkboxes = container.querySelectorAll('.pantry-checkbox');
        const userApprovedItems = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        renderFinalResults(recipes, userApprovedItems, container);
    });
}

function renderFinalResults(recipes, pantryUsed, container) {
    let html = `
        <div class="notice-box" style="margin-bottom: 15px; font-style: italic; color: #555;">
            <p>These recipes will use standard basics: <strong>${pantryUsed.length > 0 ? pantryUsed.join(', ') : 'None'}</strong>.</p>
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
                        <span style="background: #e9ecef; color: #495057; font-size: 0.75rem; font-weight: bold; padding: 4px 8px; border-radius: 12px; text-transform: uppercase;">${recipe.cuisine || 'Global'}</span>
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
