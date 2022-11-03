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

// get ALL posts by USERID
exports.getAllPostsByUser = (req, res, next) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM "posts" WHERE userId = $1`,
  [id],
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

// Mark readby
exports.setReadby = (req, res, next) => {
  pool.query(`SELECT * FROM users WHERE userid = $1`,
      [req.auth.userId],
      (error) => {
        if (error) {
          return res.status(401).json({
            error: error,
          });
        }
  
  pool.query(`SELECT * FROM "posts" WHERE postid = $1`,
  [req.params.id],
  (error, post) => {
    if (error) {
      res.status(401).json({
      error: error,
      });
    } 
    const findReadBy = post.rows[0].readby.includes(req.auth.userId);
      if (findReadBy == false) {
      pool.query(`UPDATE "posts" SET readby = ARRAY_APPEND (readby, $1) WHERE postid = $2`,
      [req.auth.userId, req.params.id],
        error => {
          if (error) {
            throw error
          }
        })
      console.log('post has been read')
      return res.status(200).json(post)   
      }   
    })
  })
}

// CREATE POST
exports.addPost = (req, res, next) => {
  let post;
  // if there is an image upload
  if (req.file) { 
    req.body.post = JSON.parse(req.body.post);
    const url = req.protocol + '://' + req.get('host')
    post = {
      title: req.body.post.title,
      author: req.body.post.author,
      postText: req.body.post.postText,
      image: url + '/images/' + req.file.filename,
      userId: req.auth.userId
    }
    pool.query(`SELECT * FROM users WHERE userid = $1`,
      [req.auth.userId],
      (error) => {
       if (error) {
        return res.status(401).json({
         error: error,
        });
       }
      pool.query(`INSERT INTO "posts"(title, author, posttext, image, userId ) VALUES ($1, $2, $3, $4, $5)`,
        [post.title, post.author, post.postText, post.image, req.auth.userId], 
        error => {
          if (error) {
            return res.status(401).json({
              error: error
            })
          }
          console.log(req.body)
          console.log('Post saved successfully')
          return res.status(200).json(post);
        } 
      )
    })
  } else {
    // no image upload
    post = {
      title: req.body.title,
      author: req.body.author,
      postText: req.body.postText,
      userId: req.auth.userId 
    }
    console.log('Jalepeno')

    pool.query(`INSERT INTO "posts"(title, author, posttext, userid) VALUES ($1, $2, $3, $4)`,
      [post.title, post.author, post.postText, req.auth.userId], 
      error => {
        if (error) {
          return res.status(401).json({
            error: error
          })
        }
        console.log('Post saved successfully')
        return res.status(201).json(post);
      }
    )
  }
}

// GET ONE POST
exports.getOnePost = (req, res, next) => {
  pool.query(`SELECT * FROM "posts" WHERE postid = $1`,
    [req.params.id],
    (error, post) => {
     if (error) {
      res.status(401).json({
        error: error,
        });
      }
      console.log(post.rows)
      return res.status(201).json(post.rows);
    }
  )
}


// MODIFY POST -- for after p7 pass off
// exports.modifyPost = (req, res, next) => {
//   const id = req.params.id;

//   pool.query(`SELECT * FROM "posts" WHERE postid = $1`,
//   [id],
//   (error) => {
//     if (error) {
//       res.status(401).json({
//       error: error,
//       });
//     } 
//     console.log(req.body)
//     if (id === null) {
//       console.log('Post does not exist')
//       res.status(401).json('Post does not exist')
//     } else {
//         const modifiedPost = {
//           title: req.body.title,
//           author: req.body.author,
//           postText: req.body.postText,
//           userId: id
//         }
//         console.log(req.body)
//         pool.query(`UPDATE "posts" SET title = $2, author = $3, postText = $4, userId = $5 WHERE postid = $1`,
//           [id, modifiedPost.title, modifiedPost.author, modifiedPost.postText, id],
//           error => {
//             if (error) {
//               throw error
//             }
//           }        
//         )
//       }
//       console.log('Post updated successfully')
//       // res.status(201).json('Post updated successfully')
//     } 
//   )
// }

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
