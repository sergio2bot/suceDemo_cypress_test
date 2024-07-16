const path = require('path');

const {CYPRESS_DIR} = require('./common/derDefinitions');
const {generateCucumberReport} = require('./htmlReporter/generateCucumberHtmlReport');
const DEFAULT_ENV='local';
const DEFAULT_BROWSER='chrome';
const DEFAULT_REPORT_DIR = path.resolve(process.cwd(), CYPRESS_DIR, 'allwyn-report');

const { argv } = require('yargs').option('env', {
  default: DEFAULT_ENV,
  description: 'The environment used when the test suite run'
}).option('browser', {
  default: DEFAULT_BROWSER,
  description: 'The browser used when the test suite run'
}).option('reportDir', {
  default: DEFAULT_REPORT_DIR,
  description: 'The directory where the report output will be stored'
}).usage('Script to generate an HTML test suite report');

const main = () => {
  let {
    env,
    browser,
    reportDir
  } = argv;
  env = (!env) ? DEFAULT_ENV : env;
  browser = (!browser) ? DEFAULT_BROWSER : browser;
  reportDir = (!reportDir) ? DEFAULT_REPORT_DIR : reportDir;
  generateCucumberReport(reportDir, browser, env);
};

main();