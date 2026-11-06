// Mock recipe database
const dummyRecipes = [
    { title: "Cheese Toast", ingredients: ["cheese", "bread"], description: "Toast bread and melt cheese on top." },
    { title: "Tomato Salad", ingredients: ["tomato", "cheese"], description: "Slice tomatoes and fresh cheese with olive oil." },
    { title: "Quick Tomato Sandwich", ingredients: ["tomato", "bread"], description: "Layer sliced tomatoes between buttered bread." }
];

export function findRecipes(userIngredients) {
    const cleanedInput = userIngredients.toLowerCase().split(',').map(i => i.trim());
    
    return dummyRecipes.filter(recipe => {
        // Check if user has at least one matching ingredient
        return recipe.ingredients.some(ing => cleanedInput.includes(ing));
    });
}

// Event Listener setup
document.getElementById('generate-btn').addEventListener('click', () => {
    const inputVal = document.getElementById('ingredients').value;
    const resultsContainer = document.getElementById('recipe-results');
    
    const matched = findRecipes(inputVal);
    
    resultsContainer.innerHTML = '';
    if (matched.length === 0) {
        resultsContainer.innerHTML = '<p>No recipes found with those ingredients. Try adding more!</p>';
        return;
    }

    matched.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `<h3>${recipe.title}</h3><p>${recipe.description}</p>`;
        resultsContainer.appendChild(card);
    });
});
