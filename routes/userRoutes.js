const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
// const signupValidation = require('../middleware/validation/signupValidation');

const userCtrl = require('../controllers/userController');

// routes
// router.post('/login', userCtrl.login);
// router.post('/signup', function(req, res) {
//     signupValidation, userCtrl.signup
// });
// router.get('/:id', auth, userCtrl.getOneUser);
// router.put('/:id', function(req, res) {
//     auth, signupValidation, userCtrl.modifyUser
// });
// router.delete('/:id', auth, userCtrl.deleteUser)

// postman routes
router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser)

module.exports = router;