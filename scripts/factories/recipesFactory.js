function recipesFactory(data) {
            
    function createDOM() {
        const divCardContainer = document.createElement( 'div' );
        divCardContainer.setAttribute("class", "container d-flex flex-wrap gap-5 justify-content-between");
        for(let i = 0; i < data.length; i ++) {
            const divCard = document.createElement( 'div' );
            divCard.setAttribute("class", "card");
            divCard.setAttribute("style", "width: 24.5em; height: 37em;");
            const greyImg = document.createElement( 'img' );
            greyImg.setAttribute("class", "card-img-top");
            greyImg.setAttribute("src", "./assets/images/greyImg.jpg ");
            const divCardBody = document.createElement( 'div' );
            divCardBody.setAttribute("class", "card-body scrollable");
            const divCardTitle = document.createElement( 'div' );
            divCardTitle.setAttribute("class", "card-title d-flex justify-content-between align-items-baseline");
            const h6CardTitle = document.createElement( 'h6' );
            const divTime = document.createElement( 'div' );
            divTime.setAttribute("class", "divTime d-flex align-items-baseline");
            const clock = document.createElement( 'i' );
            const divPTime = document.createElement( 'div' );
            divPTime.setAttribute("class", "divPTime p-1");
            divPTime.textContent = " " + data[i].time + " min";
            clock.setAttribute("class", "fa fa-clock-o");
            divTime.appendChild(clock);
            divTime.appendChild(divPTime);
            h6CardTitle.textContent = data[i].name;
            divCardTitle.appendChild(h6CardTitle);
            divCardTitle.appendChild(divTime);
            const divCardText = document.createElement( 'div' );
            divCardText.setAttribute("class", "card-text");
            const divCardTextRow = document.createElement( 'div' );
            divCardTextRow.setAttribute("class", "row");
            const divCardTextIngredients = document.createElement( 'div' );
            divCardTextIngredients.setAttribute("class", "col-6 gap-3");

            for(let j = 0; j < data[i].ingredients.length; j ++) {
                if(data[i].ingredients[j].quantity == undefined) {
                    const pIngredients = document.createElement( 'p' );
                    pIngredients.textContent = data[i].ingredients[j].ingredient;
                    divCardTextIngredients.appendChild(pIngredients);
                } else if(data[i].ingredients[j].unit != undefined) {
                    const pIngredients = document.createElement( 'p' );
                    pIngredients.textContent = data[i].ingredients[j].ingredient + " " + data[i].ingredients[j].quantity + " " + data[i].ingredients[j].unit;
                    divCardTextIngredients.appendChild(pIngredients);
                } else {
                    const pIngredients = document.createElement( 'p' );
                    pIngredients.textContent = data[i].ingredients[j].ingredient + " " + data[i].ingredients[j].quantity;
                    divCardTextIngredients.appendChild(pIngredients);
                }
            }
            
                const divCardTextInstructions = document.createElement( 'div' );
                divCardTextInstructions.setAttribute("class", "col-6 gap-3");
                divCardTextInstructions.textContent = data[i].description;
                divCardTextRow.appendChild(divCardTextIngredients);
                divCardTextRow.appendChild(divCardTextInstructions);
                divCardText.appendChild(divCardTextRow);
                divCardBody.appendChild(divCardTitle);
                divCardBody.appendChild(divCardText);
                divCard.appendChild(greyImg);
                divCard.appendChild(divCardBody);
                divCardContainer.appendChild(divCard);
        }
        return divCardContainer;
    }
    return { createDOM }
}