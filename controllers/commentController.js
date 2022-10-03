const pool = require('../models/pool');

// CREATE a comment
exports.addComment = (req, res, next) => {
  let comment;
  // if there is an image upload
  if (req.file) { 
    const url = req.protocol + '://' + req.get('host')
    comment = {
      author: req.body.author,
      comment: req.body.comment,
      image: url + '/images/' + req.file.filename,
      userId: req.body.userId
    }
    
    pool.query(`INSERT INTO "comments"(author, comment, image, postId, userId ) VALUES ($1, $2, $3, $4, $5)`,
      [comment.author, comment.postText, comment.image, comment.postId, comment.userId], 
      error => {
        if (error) {
          res.status(400).json({
          error: error
          })
        }
        console.log(req.body)
        console.log('Comment saved successfully')
        res.status(201).json('Comment saved successfully!');
      } 
    )
  } else {
    // no image upload
    comment = {
      author: req.body.author,
      comment: req.body.comment,
      postId: req.body.postId,
      userId: req.body.userId 
    }

    pool.query(`INSERT INTO "comments"(author, comment, postid, userid) VALUES ($1, $2, $3, $4)`,
      [comment.author, comment.comment, comment.postId, comment.userId], 
      error => {
        if (error) {
          res.status(400).json({
          error: error
          })
        }
        console.log(req.body)
        console.log('Comment saved successfully')
        res.status(201).json('Comment saved successfully!');
      }
    )
  }
}

// MODIFY a comment
exports.modifyComment = (req, res, next) => {
  const id = req.params.id;

  pool.query(`SELECT * FROM "comments" WHERE commentid = $1`,
  [id],
  (error) => {
    if (error) {
      res.status(401).json({
      error: error,
      });
    } 
    console.log(req.body)
    if (id === null) {
      console.log('Comment does not exist')
      res.status(401).json('Comment does not exist')
    } else {
      console.log(req.file)
      if (req.file) {
        const url = req.protocol + '://' + req.get('host');

        if (comment.rows[0].image != null) {
          const filename = post.image.split('/images')[1];
          fs.unlink('images/' + filename, () => {
            console.log('Old image ' + filename + ' deleted');
          });
        }
        const modifiedComment = {
          author: req.body.author,
          postText: req.body.postText,
          image: url + '/images' + req.file.filename,
          userId: req.body.userId
        }

        pool.query(`UPDATE "comments" SET author = $2, comment = $3, image = $4, userId = $5 WHERE commentid = $1`,
          [id, modifiedComment.author, modifiedComment.comment, modifiedComment.image, modifiedComment.userId],
          error => {
            if (error) {
              throw error
            }
          }        
        )
      } else {
        const modifiedComment = {
          author: req.body.author,
          comment: req.body.comment,
          userId: req.body.userId
        }
        console.log(req.body)
        pool.query(`UPDATE "comments" SET author = $2, comment = $3, userId = $4 WHERE commentid = $1`,
          [id, modifiedComment.author, modifiedComment.comment, modifiedComment.userId],
          error => {
            if (error) {
              throw error
            }
          }        
        )
      }
      console.log('Comment updated successfully')
      res.status(201).json('Comment updated successfully')
    } 
  })
}

// DELETE a comment
exports.deleteComment = (req, res, next) => {
  const id = req.params.id;

  pool.query(`SELECT * FROM "comments" WHERE commentid = $1`,
  [id],
  (error) => {
    if (error) {
      throw error
    }
    pool.query(`DELETE FROM "comments" WHERE commentid = $1`, 
    [id],
    (error) => {
      if (error) {
        throw error
      }
      console.log('Comment deleted successfully')
      res.status(201).json('Comment deleted sucessfully')
    })
  })
}
