// Import mongoose for MongoDB object modeling
const mongoose = require('mongoose');
// Schema constructor
const Schema = mongoose.Schema;

// Initialize a new schema object for collection 'testState'
const testStateSchema = new Schema({
  // Save ID of user that saves test
  userId: { type: String, required: true },
  // Save name of test as user input
  testName: { type: String, required: true },
  // Save corresponding type of test
  testType: { type: String, required: true },
  // Save test state object
  testState: { type: Object, required: true },
});

// Mongoose does not validate the types of the properties specified in schema
// It will only coerce the properties to equal the types specified above
// Therefore implementing data validation inside testStateController.upload

module.exports = mongoose.model('testState', testStateSchema);
