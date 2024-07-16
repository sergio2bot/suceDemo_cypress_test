
import commonLocators from '../../../fixtures/commonStepsLocators.json'
const errorMsg = '[data-test="error"]';


//--------------Actions-----------------------------
/**
 * Steps for the Data driven to verify several Authentication error scenarios
 */
When('the user enters {string} and {string}',(user,pass)=>{
    cy.fillInTextBox(commonLocators.userNameFld,user);
    cy.fillInTextBox(commonLocators.passFld,pass);
})

//--------------Assertions----------------------------
Then('the user sees the {string} message',(msg)=>{
    cy.assertElementHasText(commonLocators.errorMsg,msg);
})