const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
// const signupValidation = require('../middleware/validation/signupValidation');
// const signupSchema = require('../models/signupSchema');

const userCtrl = require('../controllers/userController');

// routes
// router.post('/login', auth, userCtrl.login);
// router.post('/signup', auth, signupValidation(signupSchema), userCtrl.signup);

// postman routes
router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);

module.exports = router;