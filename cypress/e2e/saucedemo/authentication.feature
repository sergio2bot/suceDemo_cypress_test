Feature: Authentication feature verifications

Scenario:Standard user logs in with valid credentials
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page

Scenario: Verify error message when user clicks on the Login button without providing credentials
Given the user is on the "authentication" page
When the user clicks on the "login-button"
Then the user sees the following error message:
|Epic sadface: Username is required|

Scenario: Verify error message when user doesn't enter a password
Given the user is on the "authentication" page
When the user "user" enters password "empty"
When the user clicks on the "login-button"
Then the user sees the following error message:
|Epic sadface: Password is required|

@lockedTest
Scenario:Verify error message is present for the locked out user
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
When the user clicks on the "login-button"
Then the user sees the following error message:
|Epic sadface: Sorry, this user has been locked out.|

Scenario: Verify user is redirected back to login page after logout
Given the user is on the "authentication" page
When the user "user" enters password "secret_sauce"
And the user clicks on the "login-button"
Then the user is redirected to "inventory" page
When the user clicks on the burger menu button
And the user clicks on the "Logout" link
When the user clicks on the "login-button"


Scenario Outline: DataDriven login errors check
Given the user is on the "authentication" page
When the user enters "<username>" and "<password>"
And the user clicks on the "login-button"
Then the user sees the "<error>" message

Examples:
|username|password|error|
|standard_user |test|Epic sadface: Username and password do not match any user in this service|
|locked_out_user|secret_sauce|Epic sadface: Sorry, this user has been locked out.|
 

