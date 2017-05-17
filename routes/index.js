const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const {
  catchErrors
} = require('../handlers/errorHandlers');

// TODO: temp!!!!
// const User = require('../models/User');

router.get('/', homeController.homePage);

router.get('/login', authController.isNotLoggedIn, userController.loginForm);
router.post('/login', authController.isNotLoggedIn, authController.login);

router.get('/login/twitter', authController.twitterLogin);
router.get('/login/twitter/done', authController.twitterLoginDone);
// router.get('/login/twitter/done', (req, res) => {
//   res.send(req.query);
// })

router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);
router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', authController.isLoggedIn, catchErrors(userController.updateAccount));

module.exports = router;
