const DEFAULT_ENV = 'testStandard';

const environmentConfigs ={
    teststandard:{
        homeUrl:"https://www.saucedemo.com/",
        user:"standard_user",
        password:"secret_sauce"
    },
    testlocked:{
        homeUrl:"https://www.saucedemo.com/",
        user:"locked_out_user",
        password:"secret_sauce"
    },
    testproblem:{
        homeUrl:"https://www.saucedemo.com/",
        user:"problem_user",
        password:"secret_sauce"
    },
    testglitch:{
        homeUrl:"https://www.saucedemo.com/",
        user:"performance_glitch_user",
        password:"secret_sauce" 
    },
    testerror:{
        homeUrl:"https://www.saucedemo.com/",
        user:"error_user",
        password:"secret_sauce" 
    },
    testvisual:{
        homeUrl:"https://www.saucedemo.com/",
        user:"visual_user",
        password:"secret_sauce" 
    }
}
const getSuiteEnv = () => {
    let diseredEnv = Cypress.env('ENV')?.toLowerCase();
    console.log(diseredEnv);
    if (!diseredEnv) {
      diseredEnv = DEFAULT_ENV;
    }
    return environmentConfigs[diseredEnv];
  }
  
  const suiteEnv = getSuiteEnv();
  
  export {
    suiteEnv,
  };