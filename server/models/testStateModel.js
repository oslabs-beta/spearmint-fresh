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

// mongoose does not validate the types of the properties specified in schema
// it will only coerce the properties to equal the types specified above
// therefore we use a pre-script in order to validate our data and throw an error if any prop is the incorrect type
testStateSchema.pre('save', function(next) {
  if (typeof userId !== 'string' ||
      typeof testName !== 'string' ||
      typeof testType !== 'string' ||
      typeof testState !== 'object') {
        return next('type failure');
      }
  else return next();
})

module.exports = mongoose.model('testState', testStateSchema);
