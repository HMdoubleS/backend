const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/postController');

// routes
router.get('/', auth, postCtrl.getAllPosts );
router.get('/:id', auth, postCtrl.getAllPostsByUser)
router.post('/', auth, multer, postCtrl.addPost );
router.get('/:id', auth, postCtrl.getOnePost );
router.put('/:id', auth, multer, postCtrl.modifyPost );
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;