async function getRecipes() {
    let recipesArray = recipes;

    for(let i = 0; i < recipesArray; i ++) {
        let recipe =
        {
            name: recipesArray[i].name,
            time: recipesArray[i].time,
            ingredients: recipesArray[i].ingredients.ingredient,
            quantity: recipesArray[i].ingredients.quantity,
            description: recipesArray[i].description
        }
        console.log(recipe);
        return recipe;
    }
}

async function displayData() {
    const recipe = await getRecipes();
    const recipeSection = document.querySelector(".recipeSection");
    const recipeModel = recipesFactory(recipe);
    const recipeDOM = recipeModel.createDOM();
    recipeSection.appendChild(recipeDOM);
}

displayData();