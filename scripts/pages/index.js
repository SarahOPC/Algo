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
    for(let i = 0; i < recipesArray.length; i ++) {
        for(let j = 0; j < recipesArray[i].ustensils.length; j ++) {
            ustensilsArray.push(recipesArray[i].ustensils[j].toLowerCase());
        }
    }
    let combinedUstensilsArray = removeDuplicates(ustensilsArray);
    return combinedUstensilsArray;
}

function addOptionsToSelectIngredients() {
    let ingredientsArray = retrieveIngredients();
    const datalist = document.getElementById("ingredients");
    for(let i = 0; i < ingredientsArray.length; i ++) {
        let option = document.createElement( 'option' );
        option.value = ingredientsArray[i];
        datalist.appendChild(option);    
    }
}

function addOptionsToSelectAppliance() {
    let applianceArray = retrieveAppliance();
    const datalist = document.getElementById("appliance");
    for(let i = 0; i < applianceArray.length; i ++) {
        let option = document.createElement( 'option' );
        option.value = applianceArray[i];
        datalist.appendChild(option);
    }
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

function returnToNormal() {
    let inputValue = document.getElementById("search").value.toLowerCase();
    if(inputValue.length == 0) {
        location.reload();
    }
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

function removeDuplicates(array) {
    let combinedArray = [];
    for(let i = 0; i < array.length; i ++) {
        if(combinedArray.indexOf(array[i]) === -1) {
            combinedArray.push(array[i]);
        }
    }
    return combinedArray;
}

function retrieveNewIngredients() {
    let ingredientsArray = [];
    let recipesArray = lookInRecipes();
    for(let i = 0; i < recipesArray.length; i ++) {
        for(let j = 0; j < recipesArray[i].ingredients.length; j ++) {
            ingredientsArray.push(recipesArray[i].ingredients[j].ingredient.toLowerCase());
        }
    }
    let combinedIngredientsArray = removeDuplicates(ingredientsArray);
    return combinedIngredientsArray;
}

function retrieveNewAppliance() {
    let applianceArray = [];
    let recipesArray = lookInRecipes();
    for(let i = 0; i < recipesArray.length; i ++) {
        applianceArray.push(recipesArray[i].appliance.toLowerCase());
    }
    let combinedApplianceArray = removeDuplicates(applianceArray);
    return combinedApplianceArray;
}

function retrieveNewUstensils() {
    let ustensilsArray = [];
    let recipesArray = lookInRecipes();
    for(let i = 0; i < recipesArray.length; i ++) {
        for(let j = 0; j < recipesArray[i].ustensils.length; j ++) {
            ustensilsArray.push(recipesArray[i].ustensils[j].toLowerCase());
        }
    }
    let combinedUstensilsArray = removeDuplicates(ustensilsArray);
    return combinedUstensilsArray;
}

function addOptionsToSelectNewIngredients() {
    let ingredientsArray = retrieveNewIngredients();
    const datalist = document.getElementById("ingredients");
    for(let i = 0; i < ingredientsArray.length; i ++) {
        let option = document.createElement( 'option' );
        option.value = ingredientsArray[i];
        datalist.appendChild(option);    
    }
    return datalist;
}

function addOptionsToSelectNewAppliance() {
    let applianceArray = retrieveNewAppliance();
    const datalist = document.getElementById("appliance");
    for(let i = 0; i < applianceArray.length; i ++) {
        let option = document.createElement( 'option' );
        option.value = applianceArray[i];
        datalist.appendChild(option);    
    }
    return datalist;
}

function addOptionsToSelectNewUstensils() {
    let ustensilsArray = retrieveNewUstensils();
    const datalist = document.getElementById("ustensils");
    for(let i = 0; i < ustensilsArray.length; i ++) {
        let option = document.createElement( 'option' );
        option.value = ustensilsArray[i];
        datalist.appendChild(option);    
    }
    return datalist;
}

function retrieveNewTags() {
    addOptionsToSelectNewIngredients();
    addOptionsToSelectNewAppliance();
    addOptionsToSelectNewUstensils();
}

function removeAll(datalist) {
    while (datalist.options.length > 0) {
        datalist.children[0].remove();
    }
}

function displayNewData() {
    let inputSearch = retrieveInputSearch();
    if(inputSearch !== null) {
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
    else {
        returnToNormal();
    }
}

document.getElementById("search").addEventListener("keyup", displayNewData);