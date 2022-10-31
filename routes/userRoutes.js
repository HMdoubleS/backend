const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/userController');

// ROUTES
router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, userCtrl.modifyUser );
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router;