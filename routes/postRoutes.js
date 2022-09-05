const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/postController');

// test route
router.get('/', function(req, res, next) {
    return res.status(200).json({ message: 'TEST' });
});

// routes
router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.addPost);

// postman routes
// router.get('/', postCtrl.getAllPosts);
// router.post('/', multer, postCtrl.addPost);



module.exports = router;