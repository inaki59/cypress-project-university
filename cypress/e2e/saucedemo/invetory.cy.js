const Inventory = require('../../pages/Inventory');

describe('inventory', () => {
    const inventory = new Inventory();
    beforeEach(() => {
        inventory.visitInventoryPage();
    });

    it('Validate the Number of Results', () => {
        inventory.validateNumberOfResults(6);
    });
    it('Check Remove Button Visibility and Persistency', () => {
         inventory.addToCart('Sauce Labs Backpack');
         inventory.verifyRemoveButtonVisibility('Sauce Labs Backpack');
         inventory.visitInventoryPage();
         inventory.verifyRemoveButtonVisibility('Sauce Labs Backpack');
    });

    
    it('Increase of Cart Value', () => {
        inventory.addToCart('Sauce Labs Bolt T-Shirt');
        inventory.verifyCartBadgeValue('1');
    });
    it("menu are enabled",()=>{
        inventory.clickToMenu();
    })
    it('Visibility of Remove Product Button', () => {
        inventory.addToCart('Sauce Labs Onesie');
        inventory.verifyRemoveButtonVisibility('Sauce Labs Onesie');
    });

    it('Remove product from the cart', () => {
        inventory.addToCart('Sauce Labs Onesie');
        inventory.removeProductFromCart('Sauce Labs Onesie');
        inventory.verifyCartIconNotExist();
    });
    

    it('Sort Products Alphabetically (A to Z)', () => {
        inventory.selectSortOption('az');
        inventory.getProductNames();
      });
    it('Sort Products Alphabetically (Z to A)', () => {
        inventory.selectSortOption('za');
        inventory.getProductNameRevert();
    });
    it('sort Product price low to hight  (low to high)',()=>{
        inventory.selectSortOption('lohi');
        inventory.getProductLowPricesAndVerify()
    })
    it('sort Product price higth to low  (high to low)',()=>{
        inventory.selectSortOption('hilo');
        inventory.getProductHighPricesAndVerify()
    })
    it("buy product",()=>{
        inventory.addToCart('Sauce Labs Onesie');
        inventory.makeBuy();
    })
    
});
