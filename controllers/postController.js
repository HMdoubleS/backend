// const fs = require('fs');
const pool = require('../models/pool');


// get ALL posts
exports.getAllPosts = (req, res, next) => {
  pool.query(`SELECT * FROM "posts" ORDER BY creationDate DESC`,
  (error, posts) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
1    }
  })
};

// CREATE a post
exports.addPost = (req, res, next) => {
  let post;

  // if there is a media upload
  if (req.body.file) { 
    req.body.post = JSON.parse(req.body.post)

    const url = req.protocol + '://' + req.get('host')

    post = {
      title: req.body.title,
      author: req.body.author,
      postText: req.body.postText,
      image: url + '/images/' + req.file.filename,
      userId: req.body.userId
    }

    pool.query(
      `INSERT INTO "posts"(title, author, posttext, image, userId ) 
    VALUES ($1, $2, $3, $4, $5)`,
      [post.title, post.author, post.postText, post.image, post.userId], 
      error => {
        if (error) {
          res.status(400).json({
          error: error
          })
        }
      }
    )
  } else {
    post = {
      title: req.body.title,
      author: req.body.author,
      postText: req.body.postText,
      userId: req.body.userId 
    }

    pool.query(
      `INSERT INTO "posts"(title, author, posttext, userId)
      VALUES ($1, $2, $3, $4)`,
      [post.title, post.author, post.postText, post.userId], 
      error => {
        if (error) {
          res.status(400).json({
            error: error
          })
        }
      }
    )
  }
}


// get one post
exports.getOnePost = (req, res, next) => {
  pool.query(`SELECT * FROM "posts" WHERE postId = $1`,
  [req.params.id],
  (error) => {
    if (error) {
      res.status(401).json({
      error: error,
      });
    } 
  });
  // pool.query(`SELECT * FROM "comments" WHERE postid = $1 ORDER BY creationDate DESC`, 
  //   [req.params.id],
  //   (error) => {
  //     if (error) {
  //       throw error
  //     }
  //   }
  // ) 
};



  // pool.query(`SELECT * FROM "posts" WHERE postid = $1`, 
  // [req.params.id], 
  // (error) => {
  //   if (error) {
  //     return res.status(400).json({
  //     error: error
  //     });
  //   } else {
      // pool.query(`SELECT * FROM "comments" WHERE postid = $1 ORDER BY creationDate DESC`, 
      // [req.params.id],
      // (error) => {
      //   if (error) {
      //     return res.status(400).json({
      //     error: error
      //     });
      //   }
      // }) 
  //   }
  // })







// MODIFY post 
exports.modifyPost = (req, res, next) => {
  pool.query(`SELECT * FROM "posts" WHERE postid = $1`, 
  [req.params.id],
  (error) => {
    if (error) {
      return res.status(401).json({
      error: error,
      });
    }
    if (post.rowCount === 0) {
      console.log('Post does not exist')
      res.status(401).json('Post does not exist');
    } else if (post.rowCount != 0) {
      if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.post = JSON.parse(req.body.post);

        if (post.rows[0].image != null) {
        const filename = post.image.split('/images/')[1];
        fs.unlink('images/' + filename, () => {
         console.log('New image added');
         console.log('Old image ' + filename + ' deleted');
        });
      }
        const newPostData = {
          title: req.body.title,
          author: req.body.author,
          postText: req.body.postText,
          image: url + '/images/' + req.file.filename
        }
        pool.query(
          `UPDATE "posts" SET title = $1, author = $2, postText = $3, image = $4`,
          [newPostData.title, newPostData.author, newPostData.postText, newPostData.image], 
          error => {
            if (error) {
              throw error
            }
          }
        )
      }
    }
  }
)};
  



// DELETE post
exports.deletePost = (req, res, next) => {
  const id = req.params.id;

  pool.query(`SELECT * FROM "posts" WHERE postid = $1`, [id], 
  (error, post) => {
    if (error) {
      return res.status(401).json({
        error: error
      });
    }
  }) 
  if (post.rowCount === 0) {
    console.log('Post does not exist');
    return res.status(404).json('Post does not exist')
  } else if (post.rowCount != 0) {
    if (post.rows[0].userid === id) {
      pool.query(`DELETE FROM posts WHERE postid = $1`, [id], 
      (error) => {
        if (error) {
          throw error
        }
      })
    }
  } // need a condition if the media value does exist
  if (post.rows[0].image != null){


  } else {
    console.log('Unauthorized');
    return res.status(400).json('Unauthorized');
  }
};
