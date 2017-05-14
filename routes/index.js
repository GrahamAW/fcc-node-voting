const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// TODO: temp!!!!
const User = require('../models/User');

router.get('/', homeController.homePage);

router.get('/login', userController.loginForm);
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);
router.get('/logout', authController.logout);

module.exports = router;
