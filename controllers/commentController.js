// const fs = require('fs');
const pool = require('../models/pool');

// CREATE a comment
exports.addComment = (req, res, next) => {
    if(typeof req.body.comment === "string"){
        req.body.comment = JSON.parse(req.body.comment)
      };
      const url = req.protocol + '://' + req.get('host');
      const comment = {
        commentId: req.body.comment.commentId,
        author: req.body.comment.userName,
        postText: req.body.comment.commentText,
        imageUrl: url + '/images/' + req.file.filename,
        userId: req.body.comment.userId
      };
      console.log(comment);
      
      pool.query(`INSERT INTO comments(commentId, author, commentText, imageUrl, userId) VALUES ($1, $2, $3, $4, $5, $6)`,
      [comment.commentId, comment.author, comment.commentText, comment.imageUrl, comment.userId], (error, results) => {
          if (error) {
              throw error
          }
          res.status(201).send('Comment created successfully!');
      }) .catch (
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    };
