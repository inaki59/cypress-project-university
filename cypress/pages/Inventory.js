class Inventory {
    constructor() {
    }

    visitInventoryPage() {
        cy.fixture("user").then((userData) => {
        cy.visit(userData.base_url);
        cy.get('#user-name').type(userData.standard_user);
        cy.get('#password').type(userData.password);
        cy.get('#login-button').click();
    })
    }
    clickToMenu(){
    cy.get("#react-burger-menu-btn").click();
    cy.get(".bm-item-list").should('be.visible');
    cy.get(".bm-item.menu-item").should('have.length', 4);
    }
    validateNumberOfResults(expectedNumber) {
        cy.get('.inventory_item').should('have.length', expectedNumber);
    }
   
    addToCart(productName) {
        cy.contains('.inventory_item', productName)
            .contains('Add to cart')
            .click();
    }
    makeBuy(){
        cy.get(".shopping_cart_link").click()
        cy.url().should('include', '/cart.html');
        cy.get("#checkout").click();
        cy.get("#first-name").type("ignacio")
        cy.get("#last-name").type("fernandez")
        cy.get("#postal-code").type("5008")
        cy.get("#continue").click()
        cy.get("#finish").click()
        cy.contains(".complete-text","Your order has been dispatched, and will arrive just as fast as the pony can get there!")
        cy.get("#back-to-products").click()
    }
    

    verifyCartBadgeValue(expectedValue) {
        cy.get('.shopping_cart_badge').should('have.text', expectedValue);
    }

    verifyRemoveButtonVisibility(productName) {
        cy.contains('.inventory_item', productName)
            .contains('Remove')
            .should('be.visible');
    }

    removeProductFromCart(productName) {
        cy.contains('.inventory_item', productName)
            .contains('Remove')
            .click();
    }

    verifyCartIconNotExist() {
        cy.get('.shopping_cart_badge').should('not.exist');
    }
    selectSortOption(value) {
        cy.get('select[data-test="product-sort-container"]').select(value);
      }
      getProductNames() {
        // Recolectar y procesar los nombres de los productos directamente
        cy.get('div[data-test="inventory-item-name"]').should('have.length.gt', 1).each(($name, index, $list) => {
            if (index > 0) {
                // Obtener el nombre actual y el nombre anterior
                //const currentName = $name.text().trim();
                //const previousName = Cypress.$($list[index - 1]).text().trim();
                expect(Cypress.$($list[index - 1]).text().trim().localeCompare($name.text().trim()))
                .to.be.at.most(0, `El nombre '${Cypress.$($list[index - 1]).text().trim()}' debería venir alfabéticamente antes que '${ $name.text().trim()}'`);
            }
        });
    }
    
    getProductNameRevert() {
        cy.get('div[data-test="inventory-item-name"]').should('have.length.gt', 1).each(($name, index, $list) => {
            if (index > 0) {
                expect(Cypress.$($list[index - 1]).text().trim().localeCompare($name.text().trim()))
                    .to.be.at.least(0, `El nombre '${Cypress.$($list[index - 1]).text().trim()}' debería venir alfabéticamente después que '${ $name.text().trim()}'`);
            }
        });
    }
    
    getProductLowPricesAndVerify() {
        cy.get('div[data-test="inventory-item-price"]').should('have.length.gt', 1).each(($price, index, $list) => {
            if (index > 0) {
                // Comparar el precio actual con el precio anterior
                cy.wrap(Cypress.$($list[index - 1])).invoke('text').then(previousPriceText => {
                   // const previousPrice = parseFloat(previousPriceText.replace('$', '').trim());
                   // const currentPrice = parseFloat($price.text().replace('$', '').trim());
                    expect(parseFloat(previousPriceText.replace('$', '').trim())).to.be.at.most(parseFloat($price.text().replace('$', '').trim()), `El precio '${parseFloat(previousPriceText.replace('$', '').trim())}' debería ser menor o igual que '${parseFloat($price.text().replace('$', '').trim())}'`);
                });
            }
        });
    }
    
    getProductHighPricesAndVerify() {
        cy.get('div[data-test="inventory-item-price"]').should('have.length.gt', 1).each(($price, index, $list) => {
            if (index > 0) {
                cy.wrap(Cypress.$($list[index - 1])).invoke('text').then(previousPriceText => {
                    expect(parseFloat(previousPriceText.replace('$', '').trim())).to.be.at.least(parseFloat($price.text().replace('$', '').trim()), `El precio '${parseFloat(previousPriceText.replace('$', '').trim())}' debería ser mayor o igual que '${parseFloat($price.text().replace('$', '').trim())}'`);
                });
            }
        });
    }
    
    
   
    
}

module.exports = Inventory;
