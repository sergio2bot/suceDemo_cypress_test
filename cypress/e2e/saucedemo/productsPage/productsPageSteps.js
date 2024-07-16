import {When,Then} from 'cypress-cucumber-preprocessor/steps';
import { InventoryItem } from '../../../support/utils/inventoryItem';
import productPageLocators from '../../../fixtures/productPageStepsLocators.json'

//---------------------Actions----------------------------
   When(/^the user selects "(.*)" filter option$/,(filterOption)=>{
      cy.get(productPageLocators.filterSelector).select(filterOption);
   })

   When(/^the user clicks on Add to cart for the "(.*)" item$/,(prodNumb)=>{
      cy.get(productPageLocators.addToCartBtn.replace('{numb}',prodNumb)).click();
   })

   When(/^the user clicks on the "(.*)" product name$/,(prodNum)=>{
      cy.get(productPageLocators.productLink.replace('{numb}',prodNum)).then($prod=>{
         const initialName = $prod.text()
         cy.wrap(initialName).as('productNameExp');
   });
      cy.clickOnButton(productPageLocators.productLink.replace('{numb}',prodNum))
   })

   When(/^the user adds an item to the cart$/,()=>{
      cy.get(productPageLocators.cartBadge).should((_) => { }).then(($badge) => {
         if (!$badge.length) {
           cy.log('No items added in the cart');
           cy.log('user adds first product to the card');
           cy.clickOnButton(productPageLocators.addToCartBtn.replace('{numb}','1'));
         } 
      })
   })

//--------------------Assertions--------------------------
Then(/^the user sees products listing$/,()=>{
   let items=[];
    let itemImage, itemName,itemDesc,itemPrice,inventory;
 cy.get(productPageLocators.inventoryItem).each((item)=> {
    itemImage=item.find(productPageLocators.invetoryImage).attr('alt');
    itemName=item.find(productPageLocators.inventoryName).text();
    itemDesc=item.find(productPageLocators.inventoryDesc).text();
    itemPrice=item.find(productPageLocators.inventoryPrice).text()
    inventory=new InventoryItem(itemImage,itemName,itemDesc,itemPrice);
    cy.log(`The following item is present:  ${JSON.stringify(inventory)}`);
    items.push(inventory);
 })
 cy.wrap(items).as('inventoryItemsList');
})


Then(/^the users sees product list is filtered by name "(.*)"$/,(filterOpt)=>{
      cy.get('@inventoryItemsList').then((productList)=>{
         if(productList.length>0){
            for (let i = 0; i < productList.length - 1; i++) {
               if(filterOpt==='desc'){
                  expect(productList[i].name.localeCompare(productList[i + 1].name)).to.be.gte(0);
               } else{
                  expect(productList[i].name.localeCompare(productList[i + 1].name)).to.be.lte(0);
               }
           }
         }
      })
   })

Then(/^the user sees products filtered by price from "(.*)"$/,(filterOption)=>{
   cy.get('@inventoryItemsList').then((productList)=> {
      if(productList.length>0){
         for(let i=0;i< productList.length-1;i++){
            let price1 = parseFloat(productList[i].price.replace('$', ''));
            let price2 = parseFloat(productList[i+1].price.replace('$', ''));
            if(filterOption==='low to high'){
               expect(price1).to.be.at.most(price2);
            }
            }
         }
      })
   })

   Then(/^the Add to cart button "(.*)" changes to "(.*)"$/,(prodNumb,remove)=>{
      cy.assertElementHasText(productPageLocators.addToCartBtn.replace('{numb}',prodNumb),remove)
   })

   Then(/^shopping cart badge has index "(.*)"$/,(index)=>{
      cy.assertElementHasText(productPageLocators.cartBadge,index);
   })

   Then(/^the user verifies that valid image is present for each product$/,()=>{
      cy.get('@inventoryItemsList').each(product=> {
         expect(product.image).to.equal(product.name);
      })
   })

   Then(/^the user sees product name is as expected$/,()=>{
      cy.get('@productNameExp').then(expectedProductName=>{
         cy.get(productPageLocators.inventoryName).then(currentName=>{
            expect(currentName.text()).to.equal(expectedProductName);
         })
      })
   })
