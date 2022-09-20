// const fs = require('fs');
const pool = require('../models/pool');

// get all posts
exports.getAllPosts = (req, res, next) => {
  pool.query(`SELECT * FROM posts ORDER BY creationDate DESC`,
  (error, posts) => {
    if (error) {
      return res.status(400).json({
        error: error
      });
    }
    console.log(posts.rows);
  })
};

// CREATE a post
exports.addPost = (req, res, next) => {
  if(typeof req.body.post === "string"){
    req.body.post = JSON.parse(req.body.post)
 
  const url = req.protocol + '://' + req.get('host');

  const post = {
    title: req.body.title,
    author: req.body.author,
    postText: req.body.postText,
    image: url + '/images/' + req.file.filename,
  }
  console.log(post)

  pool.query(`INSERT INTO posts(title, author, posttext, image, creationdate) 
    VALUES ($1, $2, $3, $4, NOW()::timestamp)`,
    [req.body.title, req.body.author, req.body.postText, req.body.image],
    (error) => {
      if (error) {
        res.status(400).json({
          error: error
        });
      }
    }
  );
} else {
    const post = {
      title: req.body.title,
      author: req.body.author,
      postText: req.body.postText,
      userId: req.body.userId
    }
    console.log(post);

    pool.query(`INSERT INTO posts(title, author, posttext, creationdate) 
      VALUES ($1, $2, $3, NOW()::timestamp)`,
      [req.body.title, req.body.author, req.body.postText],
      (error) => {
        if (error) {
          res.status(400).json({
            error: error
          });
        }
        console.log(req.body);
      }
    );
  }
}
  


// get one post
// TODO: need to be able to get comments attached to post as well
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;

  pool.query(`SELECT * FROM posts WHERE postid = $1`, [id], 
  (error, posts) => {
    if (error) {
      console.log(posts.rows);
      return res.status(400).json({
        error: error
      });
    } else {
      pool.query(`SELECT * FROM comments WHERE postid = $1 ORDER BY creationDate DESC`, [id],
      (error, comments) => {
        if (error) {
          console.log(comments.rows);
          return res.status(400).json({
            error: error
          });
        }
      })  
    }
  })
};




// MODIFY post 
exports.modifyPost = (req, res, next) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM posts WHERE postid = $1`, [id],
  
  )




// TODO: need to get one post before it can be modified


}; 

// DELETE post
exports.deletePost = (req, res, next) => {
  const id = req.params.id;

  pool.query(`SELECT * FROM posts WHERE postid = $1`, [id], 
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

// TODO: in postgres the image column says null even when a post has an image

  } else {
    console.log('Unauthorized');
    return res.status(400).json('Unauthorized');
  }
};
