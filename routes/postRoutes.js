const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
// const postValidation = require('../middleware/validation/postValidation');

const postCtrl = require('../controllers/postController');

// get all posts
// router.get('/',  function(req, res) {
//     auth, postValidation, postCtrl.getAllPosts
// });
// add/create post
// router.post('/',  function(req, res) {
//     auth, multer, postValidation, postCtrl.addPost
// });
// get one post
// router.get('/:id', function(req, res) {
//     auth, postValidation, postCtrl.getOnePost
// });
// modify post
// router.put('/:id', function(req, res) {
//     auth, multer, postValidation, postCtrl.modifyPost
// });
// delete post
// router.delete('/:id', function(req, res) {
//     auth, postValidation, postCtrl.deletePost
// });

// postman routes
router.get('/', postCtrl.getAllPosts); 
router.post('/', multer, postCtrl.addPost);
router.get('/:id', postCtrl.getOnePost); 
router.put('/:id', multer, postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;