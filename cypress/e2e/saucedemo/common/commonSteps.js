import {Given,When,Then} from 'cypress-cucumber-preprocessor/steps';
import { suiteEnv } from '../../../config/environment';
import commonLocators from '../../../fixtures/commonStepsLocators.json'


//--------Preconditions----------------------------------------
Given(/^the user is on the "authentication" page$/,()=>{
    cy.url().then(url =>{
        if(url!==suiteEnv.homeUrl){
            cy.visit(suiteEnv.homeUrl);
        }
    })
})

//--------------Actions -------------------------------------
When(/^the user "(.*)" enters password "(.*)"$/,(userName,password)=>{
    userName? cy.fillInTextBox(commonLocators.userNameFld,suiteEnv[userName]):cy.fillInTextBox(commonLocators.userNameFld,suiteEnv.userStandard);
    if(password!=='empty'){
    password? cy.fillInTextBox(commonLocators.passFld,password):cy.fillInTextBox(commonLocators.passFld,suiteEnv.password);
    } else {
        cy.log('User decided not to enter password');
        }
})

When(/^the user clicks on the "(.*)"$/,(datatest)=>{
    cy.clickOnButton('[data-test="'+datatest+'"]');
})


When(/^the user clicks on the burger menu button$/,()=>{
    cy.clickOnButton(commonLocators.burgerBtn);
})

When(/^the user clicks on the "(.*)" link$/,(lnkText)=>{
    cy.clickOnTheLinkByText(lnkText);
})

When(/^the user fills in "(.*)" field with the value "(.*)"$/,(datatest,value) =>{
    cy.fillInTextBox('[data-test="'+datatest+'"]',value);
    cy.assertElementHasValue('[data-test="'+datatest+'"]',value);
})
//------------------Assertions------------------------------
Then(/^the user is redirected to "(.*)" page$/,(pageName)=>{
    cy.url().should('include',pageName);
 })


Then(/^the user sees all products in the listing contains full data:$/,(datatable)=>{
    cy.get('@inventoryItemsList').each((productBadge)=>{
       datatable.rawTable.forEach((prop)=>{
          expect(productBadge[prop]).to.not.be.empty;
       })
    })
 })

 Then(/^the user sees "(.*)" is present$/,(datatest)=>{
    expect(cy.get('[data-test="'+datatest+'"]')).to.not.be.empty
 })


Then(/^the user sees the following error message:$/,(dataTable)=>{
    cy.get(commonLocators.errorMsg).should('have.text',dataTable.rawTable[0][0]);
})

