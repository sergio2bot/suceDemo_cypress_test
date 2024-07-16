Feature: Verification of the Product listing page

Scenario: Product inventory list is present
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
And the user sees products listing
And the user sees all products in the listing contains full data:
|image|
|name|
|description|
|price|
And the user verifies that valid image is present for each product

Scenario: On clicking on Product Name product details page opens
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
When the user clicks on the "2" product name
Then the user is redirected to "inventory-item" page
And the user sees products listing
And the user sees all products in the listing contains full data:
|name|
|description|
|price|

Scenario: On clicking on product name valid product details page opens
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
And the user sees products listing
When the user clicks on the "1" product name
Then the user sees product name is as expected

Scenario: User can filter product list by name
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
When the user selects "Name (Z to A)" filter option
Then the user sees products listing
And the users sees product list is filtered by name "desc"

Scenario: User can filter product list by price
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
When the user selects "Price (low to high)" filter option
Then the user sees products listing
And the user sees products filtered by price from "low to high"

Scenario: User adds product to cart
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
When the user clicks on Add to cart for the "1" item
Then the Add to cart button "1" changes to "Remove"
And shopping cart badge has index "1"
When the user clicks on Add to cart for the "1" item

Scenario: Product stays in cart after logout
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
When the user clicks on Add to cart for the "1" item
When the user clicks on the burger menu button
And the user clicks on the "Logout" link
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the Add to cart button "1" changes to "Remove"
And shopping cart badge has index "1"
When the user clicks on Add to cart for the "1" item

Scenario: Icon which shows number of items in cart updates according to the number of items added
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
When the user clicks on Add to cart for the "1" item
Then shopping cart badge has index "1"
When the user clicks on Add to cart for the "2" item
Then shopping cart badge has index "2"
When the user clicks on Add to cart for the "1" item
And the user clicks on Add to cart for the "2" item

