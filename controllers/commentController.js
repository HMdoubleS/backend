// const fs = require('fs');
const pool = require('../models/pool');

// CREATE a comment
exports.addComment = (req, res, next) => {

      const comment = {
        commentId: req.body.comment.commentId,
        author: req.body.comment.userName,
        postText: req.body.comment.commentText,
        userId: req.body.comment.userId
      };
      console.log(comment);
      
      pool.query(`INSERT INTO comments(commentId, author, commentText, userId) VALUES ($1, $2, $3, $4, $5)`,
      [comment.commentId, comment.author, comment.commentText, comment.userId], (error, results) => {
          if (error) {
              throw error
          }
          res.status(201).json('Comment created successfully!');
      }) .catch (
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    };
