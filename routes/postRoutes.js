const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/postController');

// ROUTES
router.get('/', auth, postCtrl.getAllPosts );
router.get('/:id', auth, postCtrl.getAllPostsByUser);
router.post('/', auth, multer, postCtrl.addPost );
router.get('/one/:id', auth, postCtrl.getOnePost );
// router.put('/modify/:id', auth, multer, postCtrl.modifyPost );
router.put('/:id', auth, postCtrl.setReadby);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;