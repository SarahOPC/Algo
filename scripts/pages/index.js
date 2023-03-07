async function getRecipes() {
    let recipesArray = recipes;

    let recipeData = [];
    let ingredients = [];
    for(let i = 0; i < recipesArray.length; i ++) {
        for(let j = 0; j < recipesArray[i].ingredients.length; j ++) {
            let ingredientsRecipe = 
            {
                ingredients: recipesArray[i].ingredients[j].ingredient,
                quantity: recipesArray[i].ingredients[j].quantity,
                unit:recipesArray[i].ingredients[j].unit,
            }
            ingredients.push(ingredientsRecipe);
        }

        let recipe =
        {
        name: recipesArray[i].name,
        time: recipesArray[i].time,
        description: recipesArray[i].description,
        ingredients: recipesArray[i].ingredients
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

function retrieveIngredients() {
    let ingredientsArray = [];
    let recipesArray = recipes;
    recipesArray.forEach(recipe => {
        for(let i = 0; i < recipe.ingredients.length; i ++) {
            ingredientsArray.push(recipe.ingredients[i].ingredient.toLowerCase());
        }
    })
    let finalIngredientsArray = ingredientsArray.filter((item, index) => ingredientsArray.indexOf(item) === index);
    return finalIngredientsArray;
}

function addOptionsToSelectIngredients() {
    let ingredientsArray = retrieveIngredients();
    const datalist = document.getElementById("ingredients");
    ingredientsArray.forEach(ingredient => {
        let option = document.createElement( 'option' );
        option.value = ingredient;
        datalist.appendChild(option);    
    })
}

function retrieveAppliance() {
    let applianceArray = [];
    let recipesArray = recipes;
    recipesArray.forEach(recipe => {
        applianceArray.push(recipe.appliance.toLowerCase());
    })
    let finalApplianceArray = applianceArray.filter((item, index) => applianceArray.indexOf(item) === index);
    return finalApplianceArray;
}

function addOptionsToSelectAppliance() {
    let applianceArray = retrieveAppliance();
    const datalist = document.getElementById("appliance");
    applianceArray.forEach(appliance => {
        let option = document.createElement( 'option' );
        option.value = appliance;
        datalist.appendChild(option);    
    })
}

function retrieveUstensils() {
    let ustensilsArray = [];
    let recipesArray = recipes;
    recipesArray.forEach(recipe => {
        for(let i = 0; i < recipe.ustensils.length; i ++) {
            ustensilsArray.push(recipe.ustensils[i].toLowerCase());
        }
    })
    let finalUstensilsArray = ustensilsArray.filter((item, index) => ustensilsArray.indexOf(item) === index);
    return finalUstensilsArray;
}

function addOptionsToSelectUstensils() {
    let ustensilsArray = retrieveUstensils();
    const datalist = document.getElementById("ustensils");
    ustensilsArray.forEach(ustensil => {
        let option = document.createElement( 'option' );
        option.value = ustensil;
        datalist.appendChild(option);    
    })
}

function retrieveTags() {
    addOptionsToSelectIngredients();
    addOptionsToSelectAppliance();
    addOptionsToSelectUstensils();
}

retrieveTags();
