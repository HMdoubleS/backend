const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const signupValidation = require('../middleware/validation/signupValidation');

const userCtrl = require('../controllers/userController');

// routes
// router.post('/login', auth, userCtrl.login);
// router.post('/signup', function(req, res) {
//     auth, signupValidation, userCtrl.signup
// });

// postman routes
router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);

module.exports = router;