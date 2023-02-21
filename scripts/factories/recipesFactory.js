function recipesFactory(data) {
    const { name, time, ingredient, quantity, description} = data;
        
    function createDOM() {
        const divCardContainer = document.createElement( 'div' );
        divCardContainer.setAttribute("class", "container");
        const divCardGroup = document.createElement( 'div' );
        divCardGroup.setAttribute("class", "card-group");
        const divCard = document.createElement( 'div' );
        divCard.setAttribute("class", "card");
        const greyImg = document.createElement( 'img' );
        greyImg.setAttribute("class", "card-img-top");
        greyImg.setAttribute("src", "../../assets/images/greyImg.jpg");
        const divCardBody = document.createElement( 'div' );
        divCardBody.setAttribute("class", "card-body");
        const h5CardTitle = document.createElement( 'h5' );
        h5CardTitle.setAttribute("class", "card-title");
        h5CardTitle.textContent = name + " " + time;
        const divCardText = document.createElement( 'div' );
        divCardText.setAttribute("class", "card-text");
        const divCardTextRow = document.createElement( 'div' );
        divCardTextRow.setAttribute("class", "row");
        const divCardTextIngredients = document.createElement( 'div' );
        divCardTextIngredients.setAttribute("class", "col-6 gap-3");
        divCardTextIngredients.textContent = ingredient + " " + quantity;
        const divCardTextInstructions = document.createElement( 'div' );
        divCardTextInstructions.setAttribute("class", "col-6 gap-3");
        divCardTextInstructions.textContent = description;
        divCardTextRow.appendChild(divCardTextIngredients);
        divCardTextRow.appendChild(divCardTextInstructions);
        divCardText.appendChild(divCardTextRow);
        divCardBody.appendChild(h5CardTitle);
        divCardBody.appendChild(divCardText);
        divCard.appendChild(greyImg);
        divCard.appendChild(divCardBody);
        divCardGroup.appendChild(divCard);
        divCardContainer.appendChild(divCardGroup);
        return divCardContainer;
    }
    return { name, time, ingredient, quantity, description, createDOM }
}