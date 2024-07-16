Feature: verification of the checkout functionality

Scenario: When user adds to Products to the Cart, verify that checkout page will contain valid products, user data and amount
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
When the user clicks on Add to cart for the "1" item
And the user clicks on Add to cart for the "2" item
And the user clicks on the "shopping-cart-link"
When the user clicks on the "checkout"
And the user fills in "firstName" field with the value "TESTER"
And the user fills in "lastName" field with the value "LAST NAME"
And the user fills in "postalCode" field with the value "22500"
And the user clicks on the "continue"
Then the user sees products listing
And the user sees all products in the listing contains full data:
|name|
|description|
|price|
And the user sees "payment-info-value" is present
And the user sees "shipping-info-value" is present
And the user verifies item total is as expected
When the user clicks on the "finish"
Then the user is redirected to "checkout-complete" page


Scenario:User receives error messages when one of the checkout data fields is empty
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
When the user adds an item to the cart
And the user clicks on the "shopping-cart-link"
And the user clicks on the "checkout"
And the user fills in "lastName" field with the value "LAST NAME"
And the user fills in "postalCode" field with the value "22500"
And the user clicks on the "continue"
Then the user sees the following error message:
|Error: First Name is required|
When the user fills in "firstName" field with the value "firstName"
And the user fills in "lastName" field with the value " "
And the user clicks on the "continue"
Then the user sees the following error message:
|Error: Last Name is required|


