import {When,Then} from 'cypress-cucumber-preprocessor/steps';
import checkOutPageLocators from '../../../fixtures/checkoutPageStepsLocators.json'
//--------------Locators-----------------------------------



Then(/^the user verifies item total is as expected$/,()=>{
    let expectedSum=0;
    cy.get('@inventoryItemsList').each((productItem)=>{
        const price=parseFloat(productItem.price.replace('$',''));
        expectedSum+=price;
    }).then(()=>{
        cy.get(checkOutPageLocators.subtotalFld).should('contain.text',expectedSum);
    })
    })
