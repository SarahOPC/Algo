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
    const select = document.getElementById("ingredients");
    let firstOption = new Option("Ingrédients", "");
    firstOption.setAttribute("disabled", "");
    firstOption.setAttribute("selected", "");
    select.appendChild(firstOption, undefined);
    for(index in ingredientsArray) {
        // New variable option wich stock new option from array
        let option = new Option(ingredientsArray[index], index);
        // then adding at the end of the list the option created
        select.options[select.options.length] = option;
    }
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
    const select = document.getElementById("appliance");
    let firstOption = new Option("Appareils", "");
    firstOption.setAttribute("disabled", "");
    firstOption.setAttribute("selected", "");
    select.appendChild(firstOption, undefined);
    for(index in applianceArray) {
       // New variable option wich stock new option from array
       let option = new Option(applianceArray[index], index);
       // then adding at the end of the list the option created
       select.options[select.options.length] = option;
    }
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
    const select = document.getElementById("ustensils");
    let firstOption = new Option("Ustensiles", "");
    firstOption.setAttribute("disabled", "");
    firstOption.setAttribute("selected", "");
    select.appendChild(firstOption, undefined);
    for(index in ustensilsArray) {
            // New variable option wich stock new option from array
            let option = new Option(ustensilsArray[index], index);
            // then adding at the end of the list the option created
            select.options[select.options.length] = option;    
    }
}

function retrieveTags() {
    addOptionsToSelectIngredients();
    addOptionsToSelectAppliance();
    addOptionsToSelectUstensils();
}

retrieveTags();

//----------------------------ALGO 2----------------------------//

// Arrays iterations (filter, map, reduce, ...)

function retrieveInputSearch() {
    let inputValue = document.getElementById("search").value.toLowerCase();
    if(inputValue.length < 3) {
        return null;
    }
    return inputValue;
}

function lookInRecipesArray() {
    let newRecipesArray = [];
    let recipesArray = recipes;
    let inputSearch = retrieveInputSearch();
    let resultForName = recipesArray.filter(recipe => recipe.name.toLowerCase().includes(inputSearch));
    newRecipesArray.push(resultForName);
    let resultForDescription = recipesArray.filter(recipe => recipe.description.toLowerCase().includes(inputSearch));
    newRecipesArray.push(resultForDescription);
    let resultForIngredients = recipesArray.filter(recipe =>
        recipe.ingredients.some(item => item.ingredient.includes(inputSearch))
    // some is called on ingredients array and check if at least one ingredient includes the inputSearch = true = included in filtered array
    );
    newRecipesArray.push(resultForIngredients);
    let combinedArray = [];
    combinedArray.push(...newRecipesArray[0], ...newRecipesArray[1], ...newRecipesArray[2]);
    let combinedUniqueArray = [...new Set(combinedArray)];
    return combinedUniqueArray;
}

function retrieveNewAppliance() {
    let applianceArray = [];
    let recipesArray = lookInRecipesArray();
    applianceArray = recipesArray.filter(recipe => recipe.appliance)
    .map(recipe => recipe.appliance);
    return applianceArray;
}

function retrieveNewUstensils() {
    let ustensilsArray = [];
    let recipesArray = lookInRecipesArray();
    ustensilsArray = recipesArray.filter(recipe => recipe.ustensils)
    .map(recipe => recipe.ustensils);
    return ustensilsArray;
}

function retrieveNewIngredients() {
    let ingredientsArray = [];
    let recipesArray = lookInRecipesArray();
    ingredientsArray = recipesArray.filter(recipe => recipe.ingredients.ingredient)
    .map(recipe => recipe.ingredients.ingredient);
    return ingredientsArray;
}

function addOptionsToSelectNewAppliance() {
    let applianceArray = retrieveNewAppliance();
    const select = document.getElementById("appliance");
    let firstOption = new Option("Appareils", "");
    firstOption.setAttribute("disabled", "");
    firstOption.setAttribute("selected", "");
    select.appendChild(firstOption, undefined);
    for(index in applianceArray) {
        // New variable option which stock new option from array
        let option = new Option(applianceArray[index], index);
        // then adding at the end of the list the option created
        select.options[select.options.length] = option;
    }
}

function addOptionsToSelectNewUstensils() {
    let ustensilsArray = retrieveNewUstensils();
    const select = document.getElementById("ustensils");
    let firstOption = new Option("Ustensiles", "");
    firstOption.setAttribute("disabled", "");
    firstOption.setAttribute("selected", "");
    select.appendChild(firstOption, undefined);
    for(index in ustensilsArray) {
        // New variable option which stock new option from array
        let option = new Option(ustensilsArray[index], index);
        // then adding at the end of the list the option created
        select.options[select.options.length] = option;
    }
}

function addOptionsToSelectNewIngredients() {
    let ingredientsArray = retrieveNewIngredients();
    const select = document.getElementById("ingredients");
    let firstOption = new Option("Ingrédients", "");
    firstOption.setAttribute("disabled", "");
    firstOption.setAttribute("selected", "");
    select.appendChild(firstOption, undefined);
    for(index in ingredientsArray) {
        // New variable option which stock new option from array
        let option = new Option(ingredientsArray[index], index);
        // then adding at the end of the list the option created
        select.options[select.options.length] = option;
    }
}

function retrieveNewTags() {
    addOptionsToSelectNewAppliance();
    addOptionsToSelectNewUstensils();
    addOptionsToSelectNewIngredients();
}

function removeAll(selectBox) {
    while (selectBox.options.length > 0) {
        selectBox.remove(0);
    }
}

function displayNewData() {
    let container = document.querySelector(".recipeSection");
    let childElement = document.querySelector(".container.d-flex.flex-wrap.gap-5.justify-content-between");
    container.removeChild(childElement);
    const recipe = lookInRecipesArray();
    const recipeSection = document.querySelector(".recipeSection");
    const recipeModel = recipesFactory(recipe);
    const recipeDOM = recipeModel.createDOM();
    recipeSection.appendChild(recipeDOM);
    let containerOfOptionsIngredients = document.getElementById("ingredients");
    removeAll(containerOfOptionsIngredients);
    let containerOfOptionsAppliance = document.getElementById("appliance");
    removeAll(containerOfOptionsAppliance);
    let containerOfOptionsUstensils = document.getElementById("ustensils");
    removeAll(containerOfOptionsUstensils);
    retrieveNewTags();
}

document.getElementById("search").addEventListener("keyup", displayNewData);