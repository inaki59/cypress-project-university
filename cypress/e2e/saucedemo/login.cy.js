describe('template spec', () => {
  const BASE_URL='https://www.saucedemo.com/'
  it('visit page', () => {
    cy.visit(BASE_URL)
  })
  it('url correct', () => {
    cy.visit(BASE_URL)
    cy.url().should("eq", BASE_URL)

  })
  it('tittle is swag Labs', () => {
    cy.visit(BASE_URL)
    cy.url().should("eq", BASE_URL)
    cy.title().should('eq', 'Swag Labs')
  })
  it('login unsuccesfully', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('#user-name').type('invalid_user')
    cy.get('#password').type('invalid_password')
    cy.get('#login-button').click()
    cy.get('.error-message-container').should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  })
  it('login successfully', () => {
    cy.visit(BASE_URL)
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })



})