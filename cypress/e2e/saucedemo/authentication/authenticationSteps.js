
const errorMsg = '[data-test="error"]';


//---------------ASSERTIONS-------------------------


Then(/^the user sees the following error message:$/,(dataTable)=>{
    cy.get(errorMsg).should('have.text',dataTable.rawTable[0][0]);
})