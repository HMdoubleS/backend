const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const commentValidation = require('../middleware/validation/commentValidation');

const commentCtrl = require('../controllers/commentController');

// routes
router.post('/',  function(req, res) { auth, multer, commentValidation, commentCtrl.addComment });
router.put('/:id', function(req, res) { auth, multer, postValidation, commentCtrl.modifyComment });
router.delete('/:id', function(req, res) { auth, commentCtrl.deleteComment });

// postman routes
// router.post('/', multer, commentCtrl.addComment);
// router.put('/:id', multer, commentCtrl.modifyComment);
// router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;