// const fs = require('fs');
const pool = require('../models/pool');
const user = require('../middleware/auth');

// TODO: does there have to be a create table/ drop table query??
// get all posts
// exports.getAllPosts = (req, res, next) => {
//   pool.find().then( // what do I use instead of find??
//     (posts) => {
//       res.status(200).json(posts);
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
//   pool.query(`SELECT * FROM posts`)
// };

// CREATE a post
exports.addPost = (req, res, next) => {
  console.log(req.body);
    if(req.file){
      req.body.post = req.body.post;
    
    const url = req.protocol + '://' + req.get('host');

    const post = {
      // postId: req.body.postId,
      title: req.body.title,
      author: req.body.userName,
      postText: req.body.postText,
      image: url + '/images/' + req.file.filename
    };

    // pool.query(`SELECT * FROM users WHERE userId = $1`
    //   [req.auth.userId],
    //   (error, user) => {
    //     if (error) {
    //       return res.status(401).json({
    //         error: error
    //       });
    //     }
    //   });

      // pool.query(`CREATE TABLE IF NOT EXISTS posts(
      //   postId SERIAL PRIMARY KEY,
      //   title VARCHAR NOT NULL,
      //   author VARCHAR NOT NULL,
      //   postText VARCHAR NOT NULL,
      //   image BINARY,
      //   userId INT NOT NULL 
      // )`);
      pool.query(`CREATE TABLE IF NOT EXISTS posts(
        title VARCHAR NOT NULL,
        author VARCHAR NOT NULL,
        postText VARCHAR NOT NULL,
        image BINARY
      )`);

      pool.query(`INSERT INTO posts(title, author, text, image) VALUES ($1, $2, $3, ARRAY[$4])`,
      [req.body.post.title, req.body.post.author, post.postText, post.image], (error, results) => {
          if (error) {
              throw error
          }
          res.status(201).json('Post created successfully!');
      }
    );
  }
};
 
// getting one post 
// TODO: not sure if this works in this instance or if the query is written correctly
// exports.getOnePost = (req, res, next) => {
//   post.findOne({
//     postId: req.params.id
//   }).then(
//     (post) => {
//       res.status(200).json(post);
//     }
//   ).catch(
//     (error) => {
//       res.status(404).json({
//         error: error
//       });
//     }
//   );

//   pool.query(`SELECT postID FROM posts, WHERE post.postID = $1`,
//   [post.postId], (error, results) => {
//       if (error) {
//           throw error
//       }
//       res.status(201).json('Post created successfully!');
//   }) .catch (
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// };

// MODIFY post 
exports.modifyPost = (req, res, next) => {

}; 

// DELETE post
exports.deletePost = (req, res, next) => {

};

//   // used code from delete in order to delete the old image - check for owner of the sauce
//   exports.modifySauce = (req, res, next) => {
//     let sauce = new Sauce({_id: req.params._id});
    
//     Sauce.findOne({ _id: req.params.id}).then(
//     (sauce) => {
//       if(req.auth.userId !== sauce.userId) {  //we need to check Ids as a requirement, otherwise we can change sauce that are not ours in Postman
//         console.log('My Id ' + req.auth.userId + ' is different than');
//         console.log('Sauce owner ' + sauce.userId);
//         return res.status(403).json({
//           error: new Error ('User is not authorized')
//         })
//       } else if (req.file){
//         const url = req.protocol + '://' + req.get('host');
//         req.body.sauce = JSON.parse(req.body.sauce);
//         const filename = sauce.imageUrl.split('/images/')[1];
//         fs.unlink('images/' + filename, () => {
//          console.log('New image added');
//          console.log('Old image ' + filename + ' deleted');
//         });
//         sauce = {
//           _id: req.params.id,
//           userId: sauce.userId, 
//           name: req.body.sauce.name,
//           manufacturer: req.body.sauce.manufacturer,
//           description: req.body.sauce.description,
//           mainPepper: req.body.sauce.mainPepper,
//           imageUrl: url + '/images/' + req.file.filename,
//           heat: req.body.sauce.heat,
//         };
//       } else {
//         sauce = {
//           _id: req.params.id,
//           userId: sauce.userId,
//           name: req.body.name,
//           manufacturer: req.body.manufacturer,
//           description: req.body.description,
//           mainPepper: req.body.mainPepper,
//           imageUrl: req.body.imageUrl,
//           heat: req.body.heat,
//         };
//       }
      
//     Sauce.updateOne({_id: req.params.id}, sauce).then(
//       () => {
//         res.status(201).json({
//           message: 'Sauce updated successfully!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   })
//   };
  
//   exports.deleteSauce = (req, res, next) => {
//     Sauce.findOne({_id: req.params.id}).then(
//       (sauce) => {
//         if (!sauce) {
//           return res.status(404).json({
//             error: new Error('Object not found!')
//           })
//         }
//         if (sauce.userId !== req.auth.userId) {
//           return res.status(401).json({
//             error: new Error('Request not authorized!')
//           })
//         }
//         const filename = sauce.imageUrl.split('/images/')[1];
//         fs.unlink('images/' + filename, () => {
//           Sauce.deleteOne({_id: req.params.id}).then(
//             () => {
//               res.status(200).json({
//                 message: 'Deleted!'
//               });
//             }
//           ).catch(
//             (error) => {
//               res.status(400).json({
//                 error: error
//               });
//             }
//           );
//         });
//       }
//     );
//   };