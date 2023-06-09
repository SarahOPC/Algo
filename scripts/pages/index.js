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

function retrieveAppliance() {
    let applianceArray = [];
    let recipesArray = recipes;
    recipesArray.forEach(recipe => {
        applianceArray.push(recipe.appliance.toLowerCase());
    })
    let finalApplianceArray = applianceArray.filter((item, index) => applianceArray.indexOf(item) === index);
    return finalApplianceArray;
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



document.addEventListener('DOMContentLoaded', function() {
    generateIngredientsDiv();
    generateApplianceDiv();
    generateUstensilsDiv();
}, false);

function generateIngredientsDiv() {
    let datalist = document.getElementById("ingredients");
    let optionContainer = document.createElement('div');
    optionContainer.setAttribute("class", "ingredientsContainer");
    datalist.appendChild(optionContainer);
    let ingredientsArray = retrieveIngredients();

    ingredientsArray.forEach(ingredient => {
        let option = document.createElement('p');
        option.textContent = ingredient;
        option.addEventListener("click", () => {
            putValueInIngredientTag(ingredient);
            refreshRecipesList();
        });
        optionContainer.appendChild(option);       
    });
}

let isExpanded = false;
function toggleIngredients() {
    let datalist = document.getElementById("ingredients");
    let colAppliance = document.getElementById("colAppliance");
    let colUstensil = document.getElementById("colUstensil");
    let optionsContainer = document.getElementsByClassName("ingredientsContainer");
    if(optionsContainer == undefined || optionsContainer == null) {
        generateIngredientsDiv();
    }
    
    for(let i = 0; i < optionsContainer.length; i ++) {
        if(optionsContainer[i].style.display == "none") {
            optionsContainer[i].style.display == "block";
        }
    }

    if (isExpanded) {
        datalist.style.display = 'none';
        colAppliance.classList.remove("right");
        colUstensil.classList.remove("right");
        colUstensil.classList.remove("rightUstensil");
        colAppliance.classList.add("left");
        colUstensil.classList.add("left");
        isExpanded = false;
    } else {
        datalist.style.display = 'block';
        colAppliance.classList.remove("left");
        colUstensil.classList.remove("left");
        colUstensil.classList.remove("leftUstensil");
        colAppliance.classList.add("right");
        colUstensil.classList.add("right");
        isExpanded = true;
    }
}

function putValueInIngredientTag(newValue) {
    const pTag = document.createElement( 'p' );
    pTag.setAttribute("class", "tag ingredients");
    let idName = "tag ingredients " + newValue;
    pTag.setAttribute("id", idName);
    const close = document.createElement( 'img' );
    close.setAttribute("src", "./assets/images/close.png");
    close.addEventListener("click", function() {
        closeTag(idName);
        });
    pTag.textContent = newValue;
    pTag.appendChild(close);
    const mainTag = document.querySelector(".mainTag");
    mainTag.appendChild(pTag);
    let datalist = document.getElementById("ingredients");
    datalist.style.display = 'none';
    let colAppliance = document.getElementById("colAppliance");
    let colUstensil = document.getElementById("colUstensil");
    colAppliance.classList.remove("right");
    colUstensil.classList.remove("right");
    colUstensil.classList.remove("rightUstensil");
    colAppliance.classList.add("left");
    colUstensil.classList.add("left");
    isExpanded = false;
    refreshRecipesList();
}

function generateApplianceDiv() {
    let datalist = document.getElementById("appliance");
    let optionContainer = document.createElement('div');
    optionContainer.setAttribute("class", "applianceContainer");
    datalist.appendChild(optionContainer);
    let applianceArray = retrieveAppliance();

    applianceArray.forEach(appliance => {
        let option = document.createElement('p');
        option.textContent = appliance;
        option.addEventListener("click", () => {
            putValueInApplianceTag(appliance);
            refreshRecipesList();
        });
        optionContainer.appendChild(option);       
    });
}

function toggleAppliance() {
    let datalist = document.getElementById("appliance");
    let colUstensil = document.getElementById("colUstensil");
    let optionsContainer = document.getElementsByClassName("applianceContainer");
    if(optionsContainer == undefined || optionsContainer == null) {
        generateApplianceDiv();
    }

    for(let i = 0; i < optionsContainer.length; i ++) {
        if(optionsContainer[i].style.display == "none") {
            optionsContainer[i].style.display == "block";
        }
    }

    if (isExpanded) {
        datalist.style.display = 'none';
        colUstensil.classList.remove("right");
        colUstensil.classList.remove("rightUstensil");
        colUstensil.classList.add("leftUstensil");
        isExpanded = false;
    } else {
        datalist.style.display = 'block';
        colUstensil.classList.remove("left");
        colUstensil.classList.remove("leftUstensil");
        colUstensil.classList.add("rightUstensil");
        isExpanded = true;
    }
}

function putValueInApplianceTag(newValue) {
    const pTag = document.createElement( 'p' );
    pTag.setAttribute("class", "tag appliance");
    let idName = "tag appliance " + newValue;
    pTag.setAttribute("id", idName);
    const close = document.createElement( 'img' );
    close.setAttribute("src", "./assets/images/close.png");
    close.addEventListener("click", function() {
        closeTag(idName);
        });
    pTag.textContent = newValue;
    pTag.appendChild(close);
    const mainTag = document.querySelector(".mainTag");
    mainTag.appendChild(pTag);
    let datalist = document.getElementById("appliance");
    datalist.style.display = 'none';
    let colUstensil = document.getElementById("colUstensil");
    colUstensil.classList.remove("right");
    colUstensil.classList.remove("rightUstensil");
    colUstensil.classList.add("leftUstensil");
    isExpanded = false;
    refreshRecipesList();
}

function generateUstensilsDiv() {
    let datalist = document.getElementById("ustensils");
    let optionContainer = document.createElement('div');
    optionContainer.setAttribute("class", "ustensilsContainer");
    datalist.appendChild(optionContainer);
    let ustensilsArray = retrieveUstensils();

    ustensilsArray.forEach(ustensil => {
        let option = document.createElement('p');
        option.textContent = ustensil;
        option.addEventListener("click", () => {
            putValueInUstensilTag(ustensil);
            refreshRecipesList();
        });
        optionContainer.appendChild(option);       
    });
}

function toggleUstensils() {
    let datalist = document.getElementById("ustensils");
    let optionsContainer = document.getElementsByClassName("ustensilsContainer");
    if(optionsContainer == undefined || optionsContainer == null) {
        generateUstensilsDiv();
    }

    for(let i = 0; i < optionsContainer.length; i ++) {
        if(optionsContainer[i].style.display == "none") {
            optionsContainer[i].style.display == "block";
        }
    }

    if (isExpanded) {
        datalist.style.display = 'none';
        isExpanded = false;
    } else {
        datalist.style.display = 'block';
        isExpanded = true;
    }
}

function putValueInUstensilTag(newValue) {
    const pTag = document.createElement( 'p' );
    pTag.setAttribute("class", "tag ustensils");
    let idName = "tag ustensils " + newValue;
    pTag.setAttribute("id", idName);
    const close = document.createElement( 'img' );
    close.setAttribute("src", "./assets/images/close.png");
    close.addEventListener("click", function() {
        closeTag(idName);
      });
    pTag.textContent = newValue;
    pTag.appendChild(close);
    const mainTag = document.querySelector(".mainTag");
    mainTag.appendChild(pTag);
    let datalist = document.getElementById("ustensils");
    datalist.style.display = 'none';
    isExpanded = false;
    refreshRecipesList();
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
        return [];
    }
    return inputValue.split(" ");
}

function retrieveInputAndTagElements(className, id) {
    let tagClass = document.getElementsByClassName(className);
    let inputValue = document.getElementById(id).value.toLowerCase();
    let result = [];

    if(tagClass !== undefined && tagClass.length > 0) {
        result.push(tagClass[0].id.split(className + " ")[1]);
    }
    if(inputValue.length > 2) {
        result.push(inputValue);
    }
    return result;
}

function lookInRecipes() {
    let newRecipesArray = [];
    let recipesArray = recipes;
    let inputSearch = retrieveInputSearch();
    let inputIngredientsValue = retrieveInputAndTagElements("tag ingredients", "ingredientsInput");
    let inputApplianceValue = retrieveInputAndTagElements("tag appliance", "applianceInput");
    let inputUstensilsValue = retrieveInputAndTagElements("tag ustensils", "ustensilsInput");

    let allCriteriaArray = inputSearch.concat(inputIngredientsValue, inputApplianceValue, inputUstensilsValue);
    let filteredCriteria = [...new Set(allCriteriaArray)];

    for(let i = 0; i < recipesArray.length; i ++) {
        let areCriteriaMet = true;

        for(let j = 0; j < filteredCriteria.length; j ++) {
            if(!recipesArray[i].name.toLowerCase().includes(filteredCriteria[j]) 
            && !recipesArray[i].description.toLowerCase().includes(filteredCriteria[j])) {
                areCriteriaMet = false;
            }
        }

        if(!areCriteriaMet) {
            areCriteriaMet = areIngredientsPresentInRecipe(inputIngredientsValue, recipesArray);
        }

        if (areCriteriaMet) {
            newRecipesArray.push(recipesArray[i]);
        }
    }
    return newRecipesArray.length == 0 ? recipesArray : newRecipesArray;
}

function areIngredientsPresentInRecipe(allIngredients, allRecipes) {
    allRecipes.forEach(currentRecipe => {
        currentRecipe.ingredients.forEach(currentRecipeIngredient => {
            if (currentRecipeIngredient.ingredient.toLowerCase().includes(allIngredients)) {
                return true;
            }
        })
    });

    return false;
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

function generateNewIngredientsDiv() {
    let datalist = document.getElementById("ingredients");
    let optionsContainer = document.getElementsByClassName("ingredientsContainer");
    for (let i = 0; i < optionsContainer.length; i ++) {
        optionsContainer[i].remove();
    }
    let optionContainer = document.createElement('div');
    optionContainer.setAttribute("class", "ingredientsContainer");
    datalist.appendChild(optionContainer);
    let ingredientsArray = retrieveNewIngredients();

    ingredientsArray.forEach(ingredient => {
        let option = document.createElement('p');
        option.textContent = ingredient;
        option.addEventListener("click", () => {
            putValueInIngredientTag(ingredient);
            refreshRecipesList();
        });
        optionContainer.appendChild(option);       
    });
}

function generateNewApplianceDiv() {
    let datalist = document.getElementById("appliance");
    let optionsContainer = document.getElementsByClassName("applianceContainer");
    for (let i = 0; i < optionsContainer.length; i ++) {
        optionsContainer[i].remove();
    }
    let optionContainer = document.createElement('div');
    optionContainer.setAttribute("class", "applianceContainer");
    datalist.appendChild(optionContainer);
    let applianceArray = retrieveNewAppliance();

    applianceArray.forEach(appliance => {
        let option = document.createElement('p');
        option.textContent = appliance;
        option.addEventListener("click", () => {
            putValueInApplianceTag(appliance);
            refreshRecipesList();
        });
        optionContainer.appendChild(option);       
    });
}

function generateNewUstensilsDiv() {
    let datalist = document.getElementById("ustensils");
    let optionsContainer = document.getElementsByClassName("ustensilsContainer");
    for (let i = 0; i < optionsContainer.length; i ++) {
        optionsContainer[i].remove();
    }
    let optionContainer = document.createElement('div');
    optionContainer.setAttribute("class", "ustensilsContainer");
    datalist.appendChild(optionContainer);
    let ustensilsArray = retrieveNewUstensils();

    ustensilsArray.forEach(ustensil => {
        let option = document.createElement('p');
        option.textContent = ustensil;
        option.addEventListener("click", () => {
            putValueInUstensilTag(ustensil);
            refreshRecipesList();
        });
        optionContainer.appendChild(option);       
    });
}


function removeAll(datalist) {
    while (datalist.options.length > 0) {
        datalist.children[0].remove();
    }
}

function displayError() {
    let divError = document.createElement( 'div' );
    divError.setAttribute("class", "divError");
    let pError = document.createElement( 'p' );
    pError.textContent = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
    divError.appendChild(pError);
    const recipeSection = document.querySelector(".recipeSection");
    recipeSection.appendChild(divError);
    setTimeout(function() {divError.remove();}, 7000);
}

//----------------------------DisplayTags----------------------------//

function closeTag(idName) {
    document.getElementById(idName).remove();
    let tagName = idName.split(" ")[1] + "Input";
    document.getElementById(tagName).value = "";
    displayCrossedData();
}

document.getElementById("ingredientsInput").addEventListener("focusout", function() {
    let ingredientsTagInput = document.getElementById("ingredientsInput");
    if(ingredientsTagInput.value.length >= 3) {
        const pTag = document.createElement( 'p' );
        pTag.setAttribute("class", "tag ingredients");
        let idName = "tag ingredients " + ingredientsTagInput.value.toLowerCase();
        pTag.setAttribute("id", idName);
        const close = document.createElement( 'img' );
        close.setAttribute("src", "./assets/images/close.png");
        close.addEventListener("click", function() {
            closeTag(idName);
          });
        pTag.textContent = ingredientsTagInput.value.toLowerCase();
        pTag.appendChild(close);
        const mainTag = document.querySelector(".mainTag");
        mainTag.appendChild(pTag);
        isExpanded = false;
    }
});

document.getElementById("applianceInput").addEventListener("focusout", function() {
    let applianceTagInput = document.getElementById("applianceInput");
    if(applianceTagInput.value.length >= 3) {
        const pTag = document.createElement( 'p' );
        pTag.setAttribute("class", "tag appliance");
        let idName = "tag appliance " + applianceTagInput.value.toLowerCase();
        pTag.setAttribute("id", idName);
        const close = document.createElement( 'img' );
        close.setAttribute("src", "./assets/images/close.png");
        close.addEventListener("click", function() {
            closeTag(idName);
          });
        pTag.textContent = applianceTagInput.value.toLowerCase();
        pTag.appendChild(close);
        const mainTag = document.querySelector(".mainTag");
        mainTag.appendChild(pTag);
        isExpanded = false;
    }
});

document.getElementById("ustensilsInput").addEventListener("focusout", function() {
    let ustensilsTagInput = document.getElementById("ustensilsInput");
    if(ustensilsTagInput.value.length >= 3) {
        const pTag = document.createElement( 'p' );
        pTag.setAttribute("class", "tag ustensils");
        let idName = "tag ustensils " + ustensilsTagInput.value.toLowerCase();
        pTag.setAttribute("id", idName);
        const close = document.createElement( 'img' );
        close.setAttribute("src", "./assets/images/close.png");
        close.addEventListener("click", function() {
            closeTag(idName);
          });
          pTag.textContent = ustensilsTagInput.value.toLowerCase();
        pTag.appendChild(close);
        const mainTag = document.querySelector(".mainTag");
        mainTag.appendChild(pTag);
        isExpanded = false;
    }
});

//----------------------------DisplayNewDataIfAlreadyOtherInput----------------------------//

function getRecipesFromIngredientTag(recipesArray, inputIngredientsValue) {
    if(inputIngredientsValue === null) {
        return recipesArray;
    }
    let newRecipesArray = [];
    for(let i = 0; i < recipesArray.length; i ++) {
        if(recipesArray[i].name.toLowerCase().includes(inputIngredientsValue)) {
            newRecipesArray.push(recipesArray[i]);
        } else if(recipesArray[i].description.toLowerCase().includes(inputIngredientsValue)) {
            newRecipesArray.push(recipesArray[i]);
        } else{
            for(let j= 0; j < recipesArray[i].ingredients.length; j ++) {
                if(recipesArray[i].ingredients[j].ingredient.toLowerCase().includes(inputIngredientsValue)) {
                    newRecipesArray.push(recipesArray[i]);
                }
            }
        }
    } return newRecipesArray;
}

function getRecipesFromApplianceTag(recipesArray, inputApplianceValue) {
    if(inputApplianceValue === null) {
        return recipesArray;
    }
    let newRecipesArray = [];
    for(let i = 0; i < recipesArray.length; i ++) {
        if(recipesArray[i].name.toLowerCase().includes(inputApplianceValue)) {
            newRecipesArray.push(recipesArray[i]);
        } else if(recipesArray[i].description.toLowerCase().includes(inputApplianceValue)) {
            newRecipesArray.push(recipesArray[i]);
        } else{
            for(let j= 0; j < recipesArray[i].ingredients.length; j ++) {
                if(recipesArray[i].ingredients[j].ingredient.toLowerCase().includes(inputApplianceValue)) {
                    newRecipesArray.push(recipesArray[i]);
                }
            }
        }
    } return newRecipesArray;
}

function getRecipesFromUstensilsTag(recipesArray, inputUstensilsValue) {
    if(inputUstensilsValue === null) {
        return recipesArray;
    }
    let newRecipesArray = [];
    for(let i = 0; i < recipesArray.length; i ++) {
        if(recipesArray[i].name.toLowerCase().includes(inputUstensilsValue)) {
            newRecipesArray.push(recipesArray[i]);
        } else if(recipesArray[i].description.toLowerCase().includes(inputUstensilsValue)) {
            newRecipesArray.push(recipesArray[i]);
        } else{
            for(let j= 0; j < recipesArray[i].ingredients.length; j ++) {
                if(recipesArray[i].ingredients[j].ingredient.toLowerCase().includes(inputUstensilsValue)) {
                    newRecipesArray.push(recipesArray[i]);
                }
            }
        }
    } return newRecipesArray;
}

function getRecipesFromInputSearch(recipesArray, inputSearch) {
    if(inputSearch === null) {
        return recipesArray;
    }
    let newRecipesArray = [];
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

function showNewDOM(array) {
    let container = document.querySelector(".recipeSection");
    let childElement = document.querySelector(".container.d-flex.flex-wrap.gap-5.justify-content-between");
    container.removeChild(childElement);
    const recipeSection = document.querySelector(".recipeSection");
    const recipeModel = recipesFactory(array);
    const recipeDOM = recipeModel.createDOM();
    recipeSection.appendChild(recipeDOM);
    let containerOfOptionsIngredients = document.getElementById("ingredients");
    removeAll(containerOfOptionsIngredients);
    let containerOfOptionsAppliance = document.getElementById("appliance");
    removeAll(containerOfOptionsAppliance);
    let containerOfOptionsUstensils = document.getElementById("ustensils");
    removeAll(containerOfOptionsUstensils);
    generateNewIngredientsDiv();
    generateNewApplianceDiv();
    generateNewUstensilsDiv();
}

function displayCrossedData() {
    let inputIngredientsValue = retrieveInputAndTagElements("tag ingredients", "ingredientsInput");
    let inputApplianceValue = retrieveInputAndTagElements("tag appliance", "applianceInput");
    let inputUstensilsValue = retrieveInputAndTagElements("tag ustensils", "ustensilsInput");
    let inputSearch = retrieveInputSearch();

    let newRecipeArrayIngredient = getRecipesFromIngredientTag(recipes, inputIngredientsValue);
    let newRecipeArrayAppliance = getRecipesFromApplianceTag(newRecipeArrayIngredient, inputApplianceValue);
    let newRecipeArrayUstensils = getRecipesFromUstensilsTag(newRecipeArrayAppliance, inputUstensilsValue);
    let newRecipeArraySearch = getRecipesFromInputSearch(newRecipeArrayUstensils, inputSearch);

    if(newRecipeArraySearch == "") {
        displayError();
    } 

    let recipesToDisplay = lookInRecipes();
    showNewDOM(recipesToDisplay);
}

function refreshRecipesList() {
    displayCrossedData();
}

document.getElementById("search").addEventListener("keyup", () => refreshRecipesList());
document.getElementById("ingredientsInput").addEventListener("keyup", () => refreshRecipesList());
document.getElementById("applianceInput").addEventListener("keyup", () => refreshRecipesList());
document.getElementById("ustensilsInput").addEventListener("keyup", () => refreshRecipesList());
document.getElementById("ingredientsInput").addEventListener("click", () => toggleIngredients());
document.getElementById("applianceInput").addEventListener("click", () => toggleAppliance());
document.getElementById("ustensilsInput").addEventListener("click", () => toggleUstensils());