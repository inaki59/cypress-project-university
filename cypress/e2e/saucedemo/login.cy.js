describe('template spec', () => {
  beforeEach(function () {
    cy.fixture("user").then((userData) => {
      cy.visit(userData.base_url)
      cy.get('#user-name').type(userData.standard_user)
      cy.get('#password').type(userData.password)
      cy.get('#login-button').click()
    })
  })

  it('visit page', () => {
    cy.fixture("user").then((userData) => {
      cy.visit(userData.base_url)
      cy.url().should("eq", userData.base_url)
      cy.title().should('eq', 'Swag Labs')
    })
  })

  it('login unsuccessfully', () => {
    cy.fixture("user").then((userData) => {
      cy.visit(userData.base_url)
      cy.get('#user-name').type(userData.standard_user)
      cy.get('#password').type(userData.password_incorrect)
      cy.get('#login-button').click()
      cy.get('.error-message-container').should('be.visible')
        .and('contain', 'Username and password do not match any user in this service')
    })
  })

  it('login successfully', () => {
    cy.fixture("user").then((userData) => {
    cy.visit(userData.base_url)
    cy.get('#user-name').type(userData.standard_user)
    cy.get('#password').type(userData.password)
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
     })
  })
})
