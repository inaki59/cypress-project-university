class Login {
    constructor() {
        
      }
    
      visitLoginPage() {
        cy.fixture("user").then((userData) => {
        cy.visit(userData.base_url);
    })
      }
    
      login() {
        cy.fixture("user").then((userData) => {
        cy.get('#user-name').type(userData.standard_user);
        cy.get('#password').type(userData.password);
        cy.get('#login-button').click();
    })
      }
    
      loginWithIncorrectPassword() {
        cy.fixture("user").then((userData) => {
        cy.get('#user-name').type(userData.standard_user);
        cy.get('#password').type(userData.password_incorrect);
        cy.get('#login-button').click();
    })
      }
      loginWithoutPassword() {
        cy.fixture("user").then((userData) => {
        cy.get('#user-name').type(userData.standard_user);    
        cy.get('#login-button').click();
    })
      }
      loginEmpty() {
      cy.get('#login-button').click();
      }
      verifyErrorSimbol(){
        cy.get('svg.fa-times-circle.error_icon').should('be.visible');
      }
      verifySuccessfulLogin() {
        cy.url().should('include', '/inventory.html');
        cy.get('.inventory_list').should('be.visible');
      }
      verifyErrorMessage(expectedMessage) {
        cy.get('.error-message-container').should('be.visible')
            .and('contain', expectedMessage);
    }
    
      visitPage() {
        cy.fixture("user").then((userData) => {
        cy.visit(userData.base_url);
        cy.url().should("eq", userData.base_url);
        cy.title().should('eq', 'Swag Labs');
    })
      }
      
  }
  
  module.exports = Login;
  