const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
// const commentValidation = require('../middleware/validation/commentValidation');

const commentCtrl = require('../controllers/commentController');

// add/create comment
// router.post('/',  function(req, res) {
//     auth, commentValidation, commentCtrl.addComment
// });

// modify comment
// router.put('/:id', function(req, res) {
//     auth, postValidation, commentCtrl.modifyComment
// });
// delete comment
// router.delete('/:id', function(req, res) {
//     auth, commentCtrl.deleteComment
// });

// postman routes
router.post('/', commentCtrl.addComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;