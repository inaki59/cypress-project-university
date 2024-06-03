describe('Inventario (Test Suite)', () => {
  const username = 'standard_user'
  const password = 'secret_sauce'
  const baseUrl = 'https://www.saucedemo.com/'

  beforeEach(() => {
    cy.visit(baseUrl)
    cy.get('#user-name').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
  })

  it('Validate the Number of Results', () => {
    // Validar que el número de productos mostrados es igual a 6
    cy.get('.inventory_item').should('have.length', 6)
  })

  it('Increase of Cart Value', () => {
    // Agregar al carrito el producto Sauce Labs Bolt T-Shirt
    cy.contains('.inventory_item', 'Sauce Labs Bolt T-Shirt')
      .contains('Add to cart')
      .click()
    
    // Validamos que en el icono del carrito se ha agregado el valor 1
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })

  it('Visibility of Remove Product Button', () => {
    // Agregar al carrito el producto Sauce Labs Onesie
    cy.contains('.inventory_item', 'Sauce Labs Onesie')
      .contains('Add to cart')
      .click()
    
    // Validamos que, al agregar el producto, se visualiza el botón REMOVE
    cy.contains('.inventory_item', 'Sauce Labs Onesie')
      .contains('Remove')
      .should('be.visible')
  })
  it('Remove product from the cart', () => {
    // Add the product "Sauce Labs Onesie" to the cart
    cy.contains('.inventory_item', 'Sauce Labs Onesie')
      .contains('Add to cart')
      .click()

    // Remove the product from the cart
    cy.contains('.inventory_item', 'Sauce Labs Onesie')
      .contains('Remove')
      .click()
    
    // Validate that the cart icon no longer shows the product
    cy.get('.shopping_cart_badge').should('not.exist')
  })
})
