const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
// const multer = require('../middleware/multer-config');
// const postValidation = require('../middleware/validation/postValidation');

const postCtrl = require('../controllers/postController');

// routes
// router.get('/',  function(req, res) { auth, postCtrl.getAllPosts });
router.get('/', postCtrl.getAllPosts);
// router.post('/',  function(req, res) { auth, multer, postValidation, postCtrl.addPost });
// router.get('/:id', function(req, res) { auth, postCtrl.getOnePost });
// router.put('/:id', function(req, res) { auth, multer, postValidation, postCtrl.modifyPost });
// router.delete('/:id', function(req, res) { auth, postCtrl.deletePost });

// postman routes
// router.get('/', postCtrl.getAllPosts); 
// router.post('/', multer, postCtrl.addPost);
// router.get('/:id', postCtrl.getOnePost); 
// router.put('/:id', multer, postCtrl.modifyPost);
// router.delete('/:id', postCtrl.deletePost);

module.exports = router;