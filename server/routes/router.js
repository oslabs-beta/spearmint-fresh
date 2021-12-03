// Import Express to streamline server logic with router
const express = require('express');
// Import all relevant controller objects equipped with middleware
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
// const testStateController = require('../controllers/testStateController');
// const githubController = require('../controllers/githubController');

// Initialize an express router
const router = express.Router();

// Set up route for post requests to /signup
router.post(
  '/signup',
  // Bcrypt middleware to encrypt user password
  userController.bcrypt,
  // Signup middleware to sign user up with encrypted credentials
  userController.signup,
  // Anonymous middleware to send back valid response
  (req, res) => {
    res.status(200)
      .json('Sign Up Successful');
  }
);

// Set up route for post requests to /login
router.post(
  '/login',
  // Login middleware checks encrypted credentials
  userController.login,
  // Cookie middleware to set up a new cookie
  cookieController.setSSIDCookie,
  // Session middleware to initialize new session
  sessionController.startSession,
  // Anonymous middleware to send back valid response
  (req, res) => {
    console.log('ssid:', res.locals.ssid);
    res.status(200).json({ ssid: res.locals.ssid });
  }
);



module.exports = router;