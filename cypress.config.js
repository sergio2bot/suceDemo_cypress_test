const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  video:false,
  waitForAnimations: true,
  animationDistanceThreshold: 1,


  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
        on("file:preprocessor", cucumber());
        on("before:browser:launch", (browser, launchOptions) => {
          if (browser.name === "chrome") {
            launchOptions.args.push("--disable-web-security");
            launchOptions.args.push("--disable-site-isolation-trials");
          }
        });
      require("./cypress/plugins/index.js")(on, config);
      return config;
  },
  excludeSpecPattern: "*.js",
  specPattern: "cypress/e2e/**/*.feature",
}
});
