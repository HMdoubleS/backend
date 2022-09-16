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
// router.get('/:id', auth, postValidation(postSchema), postCtrl.getOnePost);
// router.put('/:id', auth, multer, postValidation(postSchema), postCtrl.modifyPost);
// router.delete('/:id', auth, postValidation(postSchema), postCtrl.deletePost);

// postman routes
router.get('/', postCtrl.getAllPosts); // display main page
router.post('/', multer, postCtrl.addPost);
router.get('/:id', postCtrl.getOnePost); // get error 22P02 in postman when trying to find one post
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;