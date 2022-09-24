const pool = require('../models/pool');

// CREATE a comment
// TODO: test in postman
exports.addComment = (req, res, next) => {
  let comment;
  
  comment = {
    author: req.body.author,
    commentText: req.body.postText,
    postId: req.body.userId,
    userId: req.body.userId
  }

  pool.query(`INSERT INTO "comments"(author, commenttext, postId, userId)
    VALUES ($1, $2, $3, $4)`,
    [comment.author, comment.postText, comment.postId, comment.userId], 
    error => {
      if (error) {
        res.status(400).json({
          error: error
        })
      }
    }
  )
}

// MODIFY a comment
// TODO: test in postman
exports.modifyComment = (req, res, next) => {
  pool.query(
    `SELECT * FROM comments WHERE commentid = $1`,
    [req.params.id],
    (error) => {
      if (error) {
        res.status(401).json({
        error: error,
      });
    }
    if (comment.rowCount == 0) {
      console.log("Comment does not exist!");
      res.status(404).json("Comment does not exist!");
    } else if (comment.rowCount != 0) {
      if (comment.rows[0].userid == req.body.userId) {
        pool.query(`UPDATE comments SET commentText = $1`,
          [req.body.commentText],
          (error) => {
            if (error) {
            throw error;
            }
            console.log("Comment has been updated");
            res.status(201).json("Comment has been updated");
          }
        );
      } else {
        console.log("Unauthorized!");
        res.status(401).json("Unauthorized!");
      }
    }
  });
}; 

// DELETE a comment
// TODO: test in postman
exports.deleteComment = (req, res, next) => {
  pool.query(`SELECT * FROM "comments" WHERE commentid = $1`, 
  [req.params.id], 
  (error) => {
    if (error) {
      return res.status(401).json({
        error: error
      });
    }
  }) 
  if (comment.rowCount === 0) {
    console.log('Comment does not exist');
    return res.status(404).json('Comment does not exist')
  } else if (comment.rowCount != 0) {
    if (comment.rows[0].userid === id) {
      pool.query(`DELETE FROM "comments" WHERE commentid = $1`, 
      [req.params.id], 
      (error) => {
        if (error) {
          throw error
        }
      })
    }
  } else {
    res.status(404).json('Unauthorized');
  }
};