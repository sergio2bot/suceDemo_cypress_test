# saucedemo test framework

**Table of content**
*[Framework Overview](#framework-overview)
* [Framework Setup](#framework-setup)
* [Framework constraints](#framework-constraints)
* [Available npm commands](#available-npm-commands)
* [Generating html report](#generating-html-report)
* [Troubleshooting](#troubleshooting)

___



## Framework Overview

* Application under test: "[https//https://www.saucedemo.com/]"
* Test Automation Tool: Cypress+JS
* BDD approach is implemented using Cucumber + Gherkin
* Test reporter - standard cucumber test reporter
* Approach
 As automated tool is Cypress, common approach for it is an Action based. We are implementing small actions, combining them in bigger steps. Using Steps we are building Test Scenarios


## Framework Setup

* Make sure you have installed node (**node version should be 20**).
```bash
node -v
```
* Make sure git is installed and you have an access to the repo:
```bash
git -v
```
* After clonning the repository run:
```bash
npm install
```
* To run test please use scripts provided in [Available npm commands] section


## Framework constraints
When using Cypress with JavaScript and Cucumber, consider the following constraints:

1. **Asynchronous Behavior**: Cypress commands are asynchronous. Ensure you handle asynchronous code properly, especially when writing custom commands or complex test scenarios.

2. **Single Browser Context**: Cypress runs tests in a single browser context. Tests that require multiple tabs or windows need to be carefully managed or avoided.

3. **No Native Mobile Support**: Cypress does not support native mobile app testing. It is designed for web applications. For mobile web testing, ensure your tests are compatible with mobile viewports.

4. **Browser Support**: Cypress supports Chrome-family browsers (including Electron),Firefox and WebKit. Ensure your application supports these browsers for testing purposes.

5. **Cucumber Step Definitions**: Ensure your Cucumber step definitions are organized and maintained properly. Step definitions should be reusable and follow consistent naming conventions to avoid duplication.

6. **Parallel Execution**: While Cypress supports parallel test execution with its Dashboard service, ensure your tests are idempotent and can run independently to take full advantage of parallelization.

7. **Test Data Management**: Properly manage test data to ensure repeatability of tests. Consider using fixtures, factories, or other strategies to handle test data setup and teardown.



# Available npm commands 

The available npm commands are defined in [package.json](package.json)

To run any of the commands, execute from a terminal:

```bash 
npm run <command>
```

For example, to run all the test cases defined in the suit, execute:
```bash 
npm run testStandard
```

The available commands are:

* `open`: To open cypress
* `testStandard`: To run cypress
* `testlocked`: To run tests with locked user
* `testHeaded`: To run tests in headed mode
* `generateReport`: To generate HTML report
* `deleteJsonReport`:To delete report

When running any of the commands, the cypress configuration used by default is defined in [cypress.json](cypress.json)

To run some specific tests scenarios we can mark them with specific tags in the '.feature' files
* Example 
 @lockedTest
 Scenario:Scenario:Verify error message is present for the locked out user

 In the `testStandard` you can see that we are ignoring execution of this scenario,while `testlocked` script will execute it. 

## Generating html report

After running the suite, it is possible to generate an HTML report that includes information per feature and per scenario.

This script will take as input the files stored in `cucumber-json` and `screenshots` directories. The content of those folder is automatically generated when running the test suite.

The script to generate the report is:

```bash
npm run generateReport -- --help
```

* `--help`: Shows help

* `--env`: The environment used when the test suite run [default: local]

* `--browser`: The browser used when the test suite run [default: chrome]

* `--reportDir`: The directory where the report output will be stored [default: ./cypress/maa-reports]


For example, to generate a result with the previous test suite run output:

```bash
npm run generateReport
```

Report is generated under `cypress/allwyn-report`

## Troubleshooting

This section describes how to solve some errors that could happen during the first time the framework is run.


### Error 1: Cypress cannot run because this binary file does not have executable permissions

**Error**: 

```
Cypress cannot run because this binary file does not have executable permissions here:

/Users/<user_name>/Library/Caches/Cypress/9.5.4/Cypress.app/Contents/MacOS/Cypress

Reasons this may happen:
- node was installed as 'root' or with 'sudo'
- the cypress npm package as 'root' or with 'sudo'

Please check that you have the appropriate user permissions.
You can also try clearing the cache with 'cypress cache clear' and reinstalling.
```

**Solution**: 

Make sure your Cypress app directory (previously mentioned) has read and execution permisson for owner and group.

If not, run the following command:

```
chmod 755 /Users/<user_name>/Library/Caches/Cypress/9.5.4/Cypress.app/Contents/MacOS/Cypress
```

Verify the permission by running:
```
ls -ltr /Users/<user_name>/Library/Caches/Cypress/9.5.4/Cypress.app/Contents/MacOS/Cypress
```

The output should be:
```
-rwxr-xr-x
```

### Error 2: Cypress failed to start due to a missing library or dependency

**Error**: 

```
It looks like this is your first time using Cypress: 9.5.4

Cypress failed to start.

This may be due to a missing library or dependency. https://on.cypress.io/required-dependencies

Please refer to the error below for more details.
```

**Solution**: 

Follow the steps specifiend in the following link: [Installing cypress on mac - dyld: Library not loaded #4089](https://github.com/cypress-io/cypress/issues/4089)
