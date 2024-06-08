const LoginPage = require('../../pages/Login');
describe('login', () => {
  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visitLoginPage();
   
  });

  it('visit page', () => {
    loginPage.visitPage();
  });

  it('login unsuccessfully', () => {
    loginPage.loginWithIncorrectPassword();
    loginPage.verifyErrorMessage("Username and password do not match any user in this service")
  });
  it('login without credential',()=>{
    loginPage.loginEmpty();
    loginPage.verifyErrorMessage("Username is required")
  })
  it('login without password',()=>{
    loginPage.loginWithoutPassword();
    loginPage.verifyErrorMessage("Password is required")
  })
  it('simbol error appear',()=>{
    loginPage.loginWithoutPassword()
    loginPage.verifyErrorSimbol()
  })

  it('login successfully', () => {
    loginPage.login();
    loginPage.verifySuccessfulLogin();
  });

});

