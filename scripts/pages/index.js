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
retrieveTags();

function retrieveIngredients() {
    let ingredientsArray = [];
    let recipesArray = recipes;
    recipesArray.forEach(recipe => {
        for(let i = 0; i < recipe.ingredients.length; i ++) {
            ingredientsArray.push(recipe.ingredients[i].ingredient.toLowerCase());
        }
    })
    return ingredientsArray.filter((item, index) => ingredientsArray.indexOf(item) === index);
}

function retrieveAppliance() {
    let applianceArray = [];
    let recipesArray = recipes;
    recipesArray.forEach(recipe => {
        applianceArray.push(recipe.appliance.toLowerCase());
    })
    return applianceArray.filter((item, index) => applianceArray.indexOf(item) === index);
}

function retrieveUstensils() {
    let ustensilsArray = [];
    let recipesArray = recipes;
    recipesArray.forEach(recipe => {
        for(let i = 0; i < recipe.ustensils.length; i ++) {
            ustensilsArray.push(recipe.ustensils[i].toLowerCase());
        }
    })
    return ustensilsArray.filter((item, index) => ustensilsArray.indexOf(item) === index);
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

//----------------------------ALGO 1----------------------------//

// For loops

function retrieveInputSearch() {
    let inputValue = document.getElementById("search").value.toLowerCase();
    if(inputValue.length < 3) {
        return null;
    }
    return inputValue;
}

function lookInRecipes() {
    let newRecipesArray = [];
    let recipesArray = recipes;
    let inputSearch = retrieveInputSearch();
    for(let i = 0; i < recipesArray.length; i ++) {
        if(recipesArray[i].name.toLowerCase().includes(inputSearch)) {
            newRecipesArray.push(recipesArray[i]);
        } else if(recipesArray[i].description.toLowerCase().includes(inputSearch)) {
            newRecipesArray.push(recipesArray[i]);
        } else{
            for(let j= 0; j < recipesArray[i].ingredients.length; j ++) {
                if(recipesArray[i].ingredients[j].ingredient.toLowerCase().includes(inputSearch)) {
                    newRecipesArray.push(recipesArray[i]);
                }
            }
        }
    } return newRecipesArray;
}

function retrieveNewIngredients() {
    let ingredientsArray = [];
    let recipesArray = lookInRecipes();
    recipesArray.forEach(recipe => {
        for(let i = 0; i < recipe.ingredients.length; i ++) {
            ingredientsArray.push(recipe.ingredients[i].ingredient.toLowerCase());
        }
    })
    return ingredientsArray.filter((item, index) => ingredientsArray.indexOf(item) === index);
}

function retrieveNewAppliance() {
    let applianceArray = [];
    let recipesArray = lookInRecipes();
    recipesArray.forEach(recipe => {
        applianceArray.push(recipe.appliance.toLowerCase());
    })
    return applianceArray.filter((item, index) => applianceArray.indexOf(item) === index);
}

function retrieveNewUstensils() {
    let ustensilsArray = [];
    let recipesArray = lookInRecipes();
    recipesArray.forEach(recipe => {
        for(let i = 0; i < recipe.ustensils.length; i ++) {
            ustensilsArray.push(recipe.ustensils[i].toLowerCase());
        }
    })
    return ustensilsArray.filter((item, index) => ustensilsArray.indexOf(item) === index);
}

function addOptionsToSelectNewIngredients() {
    let ingredientsArray = retrieveNewIngredients();
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

function addOptionsToSelectNewAppliance() {
    let applianceArray = retrieveNewAppliance();
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

function addOptionsToSelectNewUstensils() {
    let ustensilsArray = retrieveNewUstensils();
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

function retrieveNewTags() {
    addOptionsToSelectNewIngredients();
    addOptionsToSelectNewAppliance();
    addOptionsToSelectNewUstensils();
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
    const recipe = lookInRecipes();
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