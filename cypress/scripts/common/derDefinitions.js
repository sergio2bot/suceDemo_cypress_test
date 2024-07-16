const fs = require('fs');
const path = require('path');

const CYPRESS_DIR = 'cypress';
const CUCUMBER_JSON_DIR = path.resolve(process.cwd(), CYPRESS_DIR, 'cucumber-json');
const SCREENSHOTS_DIR = path.resolve(process.cwd(), CYPRESS_DIR, 'screenshots');

const createEmptyReportDir = (reportDir) => {
  if (fs.existsSync(reportDir)) {
    fs.rmSync(reportDir, {recursive: true});
  }
  fs.mkdirSync(reportDir);
};

module.exports = {
  CYPRESS_DIR,
  CUCUMBER_JSON_DIR,
  SCREENSHOTS_DIR,
  createEmptyReportDir
};
