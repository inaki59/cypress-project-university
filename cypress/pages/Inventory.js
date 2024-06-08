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
        cy.wait(100)
        let productNames = [];
        //add productos
        cy.get('div[data-test="inventory-item-name"]').each(($name) => {
            productNames.push($name.text());
          })
          //compare array should be same
          const sortedNames = [...productNames].sort();
          expect(productNames).to.deep.equal(sortedNames, 'arrays are same');
    }
    getProductNameRevert() {
        cy.wait(100)
        let productNames = [];
        //add productos
        cy.get('div[data-test="inventory-item-name"]').each(($name) => {
            productNames.push($name.text());
          })
          //compare array should be same
          const sortedNames = [...productNames].sort().reverse();
          expect(productNames).to.deep.equal(sortedNames, 'arrays are same');
    }
    getProductLowPricesAndVerify() {
        cy.wait(100); 
        cy.get('div[data-test="inventory-item-price"]').then($prices => {
            let productPrices = $prices.map((index, html) => parseFloat(Cypress.$(html).text().replace('$', ''))).get();
            let sortedPrices = [...productPrices].sort((a, b) => a - b);
            expect(productPrices).to.deep.equal(sortedPrices, 'Los precios de productos deberían estar ordenados de menor a mayor');
        });
    }
    getProductHighPricesAndVerify() {
        cy.wait(100);  // Espera breve para estabilizar la página si es necesario
    
        // Recoger los precios y almacenarlos en un array
        cy.get('div[data-test="inventory-item-price"]').then($prices => {
            let productPrices = $prices.map((index, html) => parseFloat(Cypress.$(html).text().replace('$', ''))).get();
            let sortedPrices = [...productPrices].sort((a, b) => b - a);
            // Aserción para verificar que los precios están ordenados de mayor a menor
            expect(productPrices).to.deep.equal(sortedPrices, 'Los precios de productos deberían estar ordenados de mayor a menor');
        });
    }
    
   
    
}

module.exports = Inventory;
