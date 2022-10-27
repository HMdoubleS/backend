const fs = require('fs');
const pool = require('../models/pool');


// get ALL posts
exports.getAllPosts = (req, res, next) => {
  pool.query(`SELECT * FROM "posts" ORDER BY creationDate DESC`,
  (error, posts) => {
    if (error) {
      return res.status(400).json({
      error: error
      });
    }
    console.log(posts.rows)
    return res.status(200).json(posts.rows)
  })

}

// CREATE POST
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
      readby: req.body.readby,
      userId: req.body.userId
    }
    console.log(req.body.userId)

    pool.query(`SELECT * FROM "users" WHERE userid = $1,`
    [req.params.userId],
    (error) => {
      if (error) {
        return res.status(401).json({
          error: error
        })
      }
      console.log(req.params.userId)
      pool.query(`INSERT INTO "posts"(title, author, posttext, image, readby, userId ) VALUES ($1, $2, $3, $4, ARRAY[$5], $6)`,
        [post.title, post.author, post.postText, post.image, post.readby, req.body.userId], 
        error => {
          if (error) {
            return res.status(401).json({
              error: error
            })
          }
          console.log(req.body)
          console.log('Post saved successfully')
          res.status(200).json(post);
        } 
      )
    })
  } else {
    // no image upload
    post = {
      title: req.body.title,
      author: req.body.author,
      postText: req.body.postText,
      readby: req.body.readby,
      userId: req.body.userId 
    }
    console.log(req.body)

    pool.query(`SELECT * FROM "users" WHERE userId = $1,`
    [req.params.userId],
    (error) => {
      if (error) {
        return res.status(401).json({
          error: error
        })
      }
      console.log(req.params.userId)
      pool.query(`INSERT INTO "posts"(title, author, posttext, readby, userid) VALUES ($1, $2, $3, ARRAY[$4], $5)`,
        [post.title, post.author, post.postText, post.readby, req.body.userId], 
        error => {
          if (error) {
            return res.status(401).json({
              error: error
            })
          }
          console.log('Post saved successfully')
          res.status(201).json(post);
        }
      )
    }
  )}
}

// GET ONE POST
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
    console.log(posts)
    return res.status(200).json(posts)
  })
  const findReadBy = post.rows[0].readby.includes(req.auth.userId);
    if (findReadBy == false) {
    pool.query(`UPDATE posts SET readby = ARRAY_APPEND (readby, $1) WHERE postid = $2`,
    [req.auth.userId, req.params.id],
    (error) => {
        if (error) {
        return res.status(401).json({
            error: error,
        });
        } else {
        res.status(201).json(onePost);
        }
      })
    }
  //   pool.query(`SELECT * FROM "comments" WHERE postid = $1 ORDER BY creationDate DESC`,
  //   [id],
  //   (error, comments) => {
  //     if (error) {
  //       res.status(401).json({
  //       error: error,
  //       });
  //     } 
  //     console.log(comments.rows)
  //     res.status(201).json('Post received');
  //   })
  // })
}

// MODIFY POST
exports.modifyPost = (req, res, next) => {
  const id = req.params.id;

  pool.query(`SELECT * FROM "posts" WHERE postid = $1`,
  [id],
  (error) => {
    if (error) {
      res.status(401).json({
      error: error,
      });
    } 
    console.log(req.body)
    if (id === null) {
      console.log('Post does not exist')
      res.status(401).json('Post does not exist')
    } else {
      console.log(req.file)
      if (req.file) {
        const url = req.protocol + '://' + req.get('host');

        if (post.rows[0].image != null) {
          const filename = post.image.split('/images')[1];
          fs.unlink('images/' + filename, () => {
            console.log('Old image ' + filename + ' deleted');
          });
        }
        const modifiedPost = {
          title: req.body.title,
          author: req.body.author,
          postText: req.body.postText,
          image: url + '/images' + req.file.filename,
          readby: req.body.readby,
          userId: id
        }
        console.log(modifiedPost)

        pool.query(`UPDATE "posts" SET title = $2, author = $3, postText = $4, image = $5, readby = ARRAY[$6], userId = $7 WHERE postid = $1`,
          [id, modifiedPost.title, modifiedPost.author, modifiedPost.postText, modifiedPost.image, modifiedPost.readby, id],
          error => {
            if (error) {
              throw error
            }
          }        
        )
      } else {
        const modifiedPost = {
          title: req.body.title,
          author: req.body.author,
          postText: req.body.postText,
          readby: req.body.readby,
          userId: id
        }
        console.log(req.body)
        pool.query(`UPDATE "posts" SET title = $2, author = $3, postText = $4, readby = ARRAY[$5], userId = $6 WHERE postid = $1`,
          [id, modifiedPost.title, modifiedPost.author, modifiedPost.postText, modifiedPost.readby, id],
          error => {
            if (error) {
              throw error
            }
          }        
        )
      }
      console.log('Post updated successfully')
      res.status(201).json('Post updated successfully')
    } 
  })
}

// DELETE POST
exports.deletePost = (req, res, next) => {
  const id = req.params.id;

  pool.query(`SELECT * FROM "posts" WHERE postid = $1`,
  [id],
  (error) => {
    if (error) {
      throw error
    }
    pool.query(`SELECT * FROM "comments" WHERE postid = $1`,
    [id],
    (error) => {
      if (error) {
        throw error
      }
      pool.query(`DELETE FROM "posts" WHERE postid = $1`, 
      [id],
      (error) => {
        if (error) {
          throw error
        }
        console.log('Post deleted successfully')
        res.status(201).json('Post deleted sucessfully')
      })
    })
  })
}
