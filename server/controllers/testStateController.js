// Import test state model that defines the structure of test stored in DB
const TestState = require('../models/testStateModel');
const testStateController = {};

// Middleware to upload a passed test into DB
testStateController.upload = (req, res, next) => {
  const { testName, testType, testState } = req.body;
  const userId = req.cookies.ssid;

  console.log('userId type => ', typeof userId, 'testName type => ', typeof testName, 'testType type => ', typeof testType, 'testState type => ', typeof testState);

  // validating the types of document properties
  if (typeof userId !== 'string' ||
    typeof testName !== 'string' ||
    typeof testType !== 'string' ||
    typeof testState !== 'object') return next({ log: 'encountered a type error inside of testStateController.upload' });

  TestState.create(
    {
      userId,
      testName,
      testType,
      testState
    },
    (err) => {
      if (err) return next('Upload Failed');
      return next();
    }
  );
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
