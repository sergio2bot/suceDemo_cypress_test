const fs = require("fs-extra");
const path = require('path');

const {CUCUMBER_JSON_DIR, SCREENSHOTS_DIR} = require('../common/derDefinitions');

const REPORT_FILE_NAME = 'REPORT_FILE_NAME';
const REPORT_CONTENT = 'REPORT_CONTENT';

/**
 getCucumberReportPerFeature - returns list of available '.json' files, without a '.json' extension
 */
const getCucumberReportPerFeature = () => {
  const jsonFileNames = fs.readdirSync(CUCUMBER_JSON_DIR).filter((currentFileName) => {
    return currentFileName.indexOf(".json") > -1;
  });

  // Initialize an empty object to store the reports per feature
  let cucumberFeatureReports = {};
  let jsonFileContent, featureName;
   // Iterate over each JSON filename
  jsonFileNames.forEach((jsonFileName) => {
     // Read the content of the JSON file and parse it into a JavaScript object
    jsonFileContent = JSON.parse(fs.readFileSync(path.join(CUCUMBER_JSON_DIR, jsonFileName)));
     // If the JSON content is empty or invalid, skip to the next file
    if (! jsonFileContent[0]) {
      return;
    }
    featureName = jsonFileContent[0].uri.split("/").reverse();
    cucumberFeatureReports[featureName] = {
      REPORT_FILE_NAME: jsonFileName,
      REPORT_CONTENT: jsonFileContent
    };
  });
  return cucumberFeatureReports;
};

const readDirectoryRecursively = (baseDir) => {
  const prependPathSegment = (pathSegment) => (location) => path.join(pathSegment, location);
  const readDirWithRelativePath = (baseDir) => fs.readdirSync(baseDir).map(prependPathSegment(baseDir));
  return readDirWithRelativePath(baseDir).reduce(
    (result, currentPath) => {
      if (fs.statSync(currentPath).isDirectory()) {
        return result.concat(readDirectoryRecursively(currentPath));
      } else {
        return result.concat(currentPath);
      }
    }, 
    []);
};

const getScenarioScreenshots = () => {
  return readDirectoryRecursively(path.resolve(SCREENSHOTS_DIR)).filter((file) => {
    return file.indexOf(".png") > -1;
  });
};

const getPossibleScenariosForScreenshot = (featureContent, screenshot) => {
  const screenshotFileName = screenshot.replace(/^.*[\\\/]/, "");
  let scenarioFullName = '';
  let possibleScenariosForTheScreenshot = [];
  featureContent.elements.forEach((scenario) => {
    scenarioFullName = featureContent.name + " -- " + scenario.name;
    if (screenshotFileName.includes(scenarioFullName)) {
      possibleScenariosForTheScreenshot.push(scenario);
    }
  });
  return possibleScenariosForTheScreenshot;
}

const getScreenshotCorrespondingStep = (scenario, screenshot) => {
  let screenshotCorrespondingStep;
  if (screenshot.includes("(failed)")) {
    screenshotCorrespondingStep = scenario.steps.find((step) => step.result.status === "failed");
  } else {
    screenshotCorrespondingStep = scenario.steps.find((step) => step.result.status === "passed");
  }
  return screenshotCorrespondingStep;
};

const addScreenshotAsEmbeddedDataToStep = (step, screenshot) => {
  let screenshotData = fs.readFileSync(path.resolve(screenshot));
  let addedScreenshotData = false;
  if (screenshotData) {
    screenshotBase64 = Buffer.from(screenshotData, "binary").toString("base64");
    if (! step.embeddings) {
      step.embeddings = [];
      step.embeddings.push({data: screenshotBase64, mime_type: "image/png", name: step.name});
      addedScreenshotData = true;
    }
  }
  return addedScreenshotData;
};

const writeFeatureReportBackToFile = (cucumberFeatureReports, feature) => {
  const jsonIndentLevel = 2;
  fs.writeFileSync(
    path.join(CUCUMBER_JSON_DIR, cucumberFeatureReports[feature][REPORT_FILE_NAME]), 
    JSON.stringify(cucumberFeatureReports[feature][REPORT_CONTENT], null, jsonIndentLevel));
};

const addScreenshotsToReportFiles = () => {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    return;
  }

  let cucumberFeatureReports = getCucumberReportPerFeature();
  const screenshots = getScenarioScreenshots();
  const featuresWithScreenshots = Array.from(new Set(screenshots.map((x) => x.match(/[\w-_.]+.feature/g)[0])));

  let featureContent, possibleScenariosForTheScreenshot, screenshotCorrespondingStep, addedScreenshotData;

  featuresWithScreenshots.forEach((feature) => {
    featureContent = cucumberFeatureReports[feature][REPORT_CONTENT][0];
    screenshots.forEach((screenshot) => {
      
      possibleScenariosForTheScreenshot = getPossibleScenariosForScreenshot(featureContent, screenshot);
      if (possibleScenariosForTheScreenshot) {
        addedScreenshotData = false;
        possibleScenariosForTheScreenshot.forEach((scenario) => {
          if (!addedScreenshotData) {
            screenshotCorrespondingStep = getScreenshotCorrespondingStep(scenario, screenshot);
            if (screenshotCorrespondingStep) {
              addedScreenshotData = addScreenshotAsEmbeddedDataToStep(screenshotCorrespondingStep, screenshot);
            }
          }
        });
      }

      writeFeatureReportBackToFile(cucumberFeatureReports, feature);
    });
  });
};

module.exports = {
  addScreenshotsToReportFiles,
};
