// const fs = require('fs');
const pool = require('../models/pool');
const { post } = require('../routes/postRoutes');
// const user = require('../middleware/auth');


// get all posts
exports.getAllPosts = (req, res, next) => {
  pool.query(`SELECT * FROM posts ORDER BY creationDate DESC`,
  (error, posts) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
  })
};

// CREATE a post
exports.addPost = (req, res, next) => {
  if(req.file) {
    req.body.post = JSON.parse(req.body.post)

  const url = req.protocol + '://' + req.get('host');
  const { postId, title, author, postText, image, userId } = req.body;
  
  const post = {
    postId: req.body.postId,
    title: req.body.title,
    author: req.body.author,
    postText: req.body.postText,
    image: url + '/images/' + req.file.filename,
    userId: req.body.userId
  }
  console.log(post)

  // TODO: This did not work so I am not sure if I need this
  // pool.query(`SELECT * FROM users WHERE userid = $1`,
  // [req.auth.userId],
  // (error, user) => {
  //   if (error) {
  //     return res.status(400).json({
  //       error: error
  //     });
  //   }
  pool.query(`INSERT INTO posts(postid, title, author, posttext, image, userid, creationdate) 
    VALUES ($1, $2, $3, $4, $5, $6, NOW()::timestamp)`,
    [post.postId, req.body.title, req.body.author, req.body.postText, req.body.image, req.body.userId],
    (error) => {
      if (error) {
        res.status(400).json({
          error: error
        });
      }
    }
  );
  // })
  } else {
    const { postId, title, author, postText, userId } = req.body;
    const post = {
      postId: req.body.postId,
      title: req.body.title,
      author: req.body.author,
      postText: req.body.postText,
      userId: req.body.userId
    }
    console.log(post)

    pool.query(`INSERT INTO posts(postid, title, author, posttext, userid, creationdate) 
      VALUES ($1, $2, $3, $4, $5, NOW()::timestamp)`,
      [post.postId, req.body.title, req.body.author, req.body.postText, req.body.userId],
      (error) => {
        if (error) {
          res.status(400).json({
            error: error
          });
        }
      }
    );
  }
}

// get one post
// TODO: need to be able to get comments attached to post as well
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  res.send(`post ${id}`);

  pool.query(`SELECT * FROM posts WHERE postid = $1`,
  [id], (error, post) => {
      if (error) {
          return res.status(401).json({
            error: error
          })
      }
      res.status(201).json(results.rows)
  })
};




// MODIFY post 
exports.modifyPost = (req, res, next) => {

}; 

// DELETE post
exports.deletePost = (req, res, next) => {

};
