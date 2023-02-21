async function getRecipes() {
    let recipesArray = recipes;

    let recipeData = [];
    for(let i = 0; i < recipesArray.length; i ++) {
        let recipe =
        {
            name: recipesArray[i].name,
            time: recipesArray[i].time,
            ingredients: recipesArray[i].ingredients.ingredient,
            quantity: recipesArray[i].ingredients.quantity,
            description: recipesArray[i].description
        }
        recipeData.push(recipe);
    }
  return recipeData;
}

async function displayData() {
    const recipe = await getRecipes();
    const recipeSection = document.querySelector(".recipeSection");
    const recipeModel = recipesFactory(recipe);
    const recipeDOM = recipeModel.createDOM();
    recipeSection.appendChild(recipeDOM);
}

displayData();