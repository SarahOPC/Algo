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

function retrieveElements(element, itemArray, finalItemArray) {
    let itemArray = [];
    let recipesArray = element;
    recipesArray.forEach(element => {
        for(let i = 0; i < element.ingredients.length; i ++) {
            itemArray.push(element.ingredients[i].ingredient.toLowerCase());
        }
    })
    let finalItemArray = itemArray.filter((item, index) => itemArray.indexOf(item) === index);
    return finalItemArray;
}

function addOptionsToSelectElements(itemArray, retrieveElements, element, Elements) {
    let itemArray = retrieveElements();
    const select = document.getElementById(element);
    let firstOption = new Option(Elements, "");
    firstOption.setAttribute("disabled", "");
    firstOption.setAttribute("selected", "");
    select.appendChild(firstOption, undefined);
    for(index in itemArray) {
        // New variable option wich stock new option from array
        let option = new Option(itemArray[index], index);
        // then adding at the end of the list the option created
        select.options[select.options.length] = option;
    }
}

function retrieveTags() {
    addOptionsToSelectElements(ingredientsArray, retrieveElements(recipes, ingredientsArray, finalIngredientsArray), ingredients, Ingrédients);
    addOptionsToSelectElements(applianceArray, retrieveElements(recipes, applianceArray, finalApplianceArray), appliance, Appareils);
    addOptionsToSelectElements(ustensilsArray, retrieveElements(recipes, ustensilsArray, finalUstensilsArray), ustensils, Ustensiles);
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

function retrieveNewTags() {
    addOptionsToSelectElements(ingredientsArray, retrieveElements(lookInRecipes(), ingredientsArray, finalIngredientsArray), ingredients, Ingrédients);
    addOptionsToSelectElements(applianceArray, retrieveElements(lookInRecipes(), applianceArray, finalApplianceArray), appliance, Appareils);
    addOptionsToSelectElements(ustensilsArray, retrieveElements(lookInRecipes(), ustensilsArray, finalUstensilsArray), ustensils, Ustensiles);
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
    let containerOfFilters = document.querySelector(".container.filters");
    let childRows = containerOfFilters.querySelectorAll("option");
    //childRows.length = 0;
    retrieveNewTags();
}

document.getElementById("search").addEventListener("keyup", displayNewData);