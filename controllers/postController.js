const fs = require('fs');
const pool = require('../models/pool');


// get ALL posts - works in postman
exports.getAllPosts = (req, res, next) => {
  pool.query(`SELECT * FROM "posts" ORDER BY creationDate DESC`,
  (error, posts) => {
    if (error) {
      return res.status(400).json({
      error: error
      });
     }
     console.log(posts.rows)
  })
};

// CREATE a post - works in postman
exports.addPost = (req, res, next) => {
  let post;
  // if there is an image upload
  if (req.file) { 
    const url = req.protocol + '://' + req.get('host')
    post = {
      title: req.body.title,
      author: req.body.author,
      postText: req.body.postText,
      image: url + '/images/' + req.file.filename,
      userId: req.body.userId
    }
    
    pool.query(`INSERT INTO "posts"(title, author, posttext, image, userId ) VALUES ($1, $2, $3, $4, $5)`,
      [post.title, post.author, post.postText, post.image, post.userId], 
      error => {
        if (error) {
          res.status(400).json({
          error: error
          })
        }
        console.log('Post saved successfully')
        res.status(201).json('Post saved successfully!');
      } 
    )
  } else {
    // no image upload
    post = {
      title: req.body.title,
      author: req.body.author,
      postText: req.body.postText,
      userId: req.body.userId 
    }

    pool.query(`INSERT INTO "posts"(title, author, posttext, userid) VALUES ($1, $2, $3, $4)`,
      [post.title, post.author, post.postText, post.userId], 
      error => {
        if (error) {
          res.status(400).json({
          error: error
          })
        }
        console.log('Post saved successfully')
        res.status(201).json('Post saved successfully!');
      }
    )
  }
}


// get one post
// TODO: need to grab comments from shown post
exports.getOnePost = (req, res, next) => {
  const id = req.params.id;
  
  pool.query(`SELECT * FROM "posts" WHERE postid = $1`,
  [id],
  (error, posts) => {
    if (error) {
      res.status(401).json({
      error: error,
      });
    } 
    console.log(posts.rows)

    pool.query(`SELECT * FROM "comment" WHERE postid = $1 ORDER BY creationDate DESC`,
    [id],
    (error, comment) => {
      if (error) {
        res.status(401).json({
        error: error,
        });
      } 
      console.log(comment.rows)
      res.status(201).send(posts.rows && comment.rows);
    })
  })
};

// MODIFY post 
// TODO: test in postman
exports.modifyPost = (req, res, next) => {
  const id = req.params.id
  pool.query(`SELECT * FROM "posts" WHERE postid = $1`, 
  [id],
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
         console.log('Old image ' + filename + ' deleted');
        });
      }
        const modifiedPost = {
          title: req.body.title,
          author: req.body.author,
          postText: req.body.postText,
          image: url + '/images/' + req.file.filename,
          userId: req.body.userId
        }
        pool.query(
          `UPDATE "posts" SET title = $2, author = $3, postText = $4, image = $5, userId = $6 WHERE postid = $1`,
          [id, modifiedPost.title, modifiedPost.author, modifiedPost.postText, modifiedPost.image, modifiedPost.userId], 
          error => {
            if (error) {
              throw error
            }
            res.status(201).json('Post updated successfullly')
          }
        )
      } 

    }
  }
)};
  


// DELETE post
// TODO: test in postman
exports.deletePost = (req, res, next) => {
  pool.query(`SELECT * FROM "posts" WHERE postid = $1`, 
  [req.params.id], 
  (error) => {
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
      pool.query(`DELETE FROM posts WHERE postid = $1`, 
      [req.params.id], 
      (error) => {
        if (error) {
          throw error
        }
      })
      // if image does exist
      if (post.rows[0].image != null){
        const filename = post.image.split('/images/')[1];
          fs.unlink('images/' + filename, () => {});
      } 
      res.status(201).json('Image has been deleted');
    }
  } else {
    res.status(404).json('Unauthorized');
  }
};
