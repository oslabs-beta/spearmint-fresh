// Import test state model that defines the structure of test stored in DB
const TestState = require('../models/testStateModel');
const testStateController = {};

// Middleware to validate the data we're using to attempt to create a new document to the MongoDB
testStateController.validate = (req, res, next) => {
  try {
    const { testName, testType, testState } = req.body;
    const userId = req.cookies.ssid;

    // if any type doesnt match the model, pass error log into next()
    if (typeof userId !== 'string' ||
      typeof testName !== 'string' ||
      typeof testType !== 'string' ||
      typeof testState !== 'object') return next({ log: 'Encountered a type error' });

    // else save a newTestState to res.locals so we can pass it forward to the doc upload middleware
    res.locals.newTestState = {
      userId,
      testName,
      testType,
      testState
    } 

    return next();
  }
  catch (err) {
    return next('Validation process failed')
  }
}

// Middleware to upload a passed test into DB
testStateController.upload = (req, res, next) => {
  try {
    // if we've reached upload, the data from which we're attempting to create a new document
    // has been validated. therefore we invoke models.create() passing in the object that is our new document
    // as well as a callback to handle any error in the process of writing this new doc to the database
    TestState.create(
      res.locals.newTestState,
      (err) => {
        if (err) return next('Upload Failed');
        return next();
      }
    );
  }
  catch (err) {
    return next('Document creation function error');
  }
};

// Middleware too get all saved tests of current user and of selected type
testStateController.getTests = (req, res, next) => {
  TestState.find({ userId: req.cookies.ssid, testType: req.params.testType }, (err, result) => {
    // If an error occurs, invoke error handler with err object
    if (err) return next(err);
    // Save resulting tests array to locals object
    res.locals.tests = result;
    return next();
  });
};

module.exports = testStateController;
