// Event Listener Setup with Error Boundary Debugging
document.addEventListener('DOMContentLoaded', () => {
    // Check both common ID variations to prevent null reference errors
    const generateBtn = document.getElementById('generate-btn') || document.getElementById('generate');
    const inputElement = document.getElementById('ingredients') || document.getElementById('ingredient-input');
    const resultsContainer = document.getElementById('recipe-results') || document.getElementById('results');

    if (!generateBtn || !inputElement || !resultsContainer) {
        console.error("FridgeToTable Error: Could not find required DOM elements (#generate-btn, #ingredients, or #recipe-results). Check your HTML IDs!");
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
