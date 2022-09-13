const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// const postValidation = require('../middleware/validation/postValidation');
// const postSchema = require('../models/postSchema');

const postCtrl = require('../controllers/postController');

// routes
// router.get('/', auth, postValidation(postSchema), postCtrl.getAllPosts);
// router.post('/', auth, multer, postValidation(postSchema), postCtrl.addPost);
// router.get('/:id', auth, postValidation(postSchema), postCtrl.getOnePost)

// postman routes
router.get('/', postCtrl.getAllPosts);
router.post('/', multer, postCtrl.addPost);
router.get('/:id', postCtrl.getOnePost)

module.exports = router;