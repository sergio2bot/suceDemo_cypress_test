// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillInTextBox',(textBox,text)=>{
    cy.get(textBox).clear().type(text);
})

Cypress.Commands.add('clickOnButton',(btn)=>{
    cy.get(btn).scrollIntoView().click();
})

Cypress.Commands.add('clickOnTheLinkByText',(text)=>{
    cy.get('a').contains(text).click();
})

Cypress.Commands.add('assertElementHasText',(locator,text)=>{
    cy.get(locator).should('have.text',text);
})

Cypress.Commands.add('assertElementHasValue',(locator,value)=>{
    cy.get(locator).should('have.value',value);
})