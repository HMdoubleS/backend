// const fs = require('fs');
const pool = require('../models/pool');

// TODO: does there have to be a create table/ drop table query??
// get all posts
exports.getAllPosts = (req, res, next) => {
  pool.find().then(
    (posts) => {
      res.status(200).json(posts);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
  pool.query(`SELECT * FROM posts`)
};

// CREATE a post
exports.addPost = (req, res, next) => {
    if(typeof req.body.post === "string"){
      req.body.post = JSON.parse(req.body.post)
    };
    const url = req.protocol + '://' + req.get('host');
    const post = {
      postId: req.body.post.postId,
      title: req.body.post.title,
      author: req.body.post.userName,
      postText: req.body.post.postText,
      imageUrl: url + '/images/' + req.file.filename,
      userId: req.body.post.userId
    };
    console.log(post);
    
    pool.query(`INSERT INTO posts(postId, title, author, postText, imageUrl, userId) VALUES ($1, $2, $3, $4, $5, $6)`,
    [post.postId, post.title, post.author, post.postText, post.imageUrl, post.userId], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send('Post created successfully!');
    }) .catch (
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
  
//   exports.getOneSauce = (req, res, next) => {
//     Sauce.findOne({
//       _id: req.params.id
//     }).then(
//       (sauce) => {
//         res.status(200).json(sauce);
//       }
//     ).catch(
//       (error) => {
//         res.status(404).json({
//           error: error
//         });
//       }
//     );
//   };
  
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
  
//   exports.getAllSauces = (req, res, next) => {
//     // console.log('I am here');
//     Sauce.find().then(
//       (sauces) => {
//         res.status(200).json(sauces);
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//    );
//   };
  
  
//   // find one sauce
//   // use a conditional to show which rating has been clicked - will assign a number (1, -1, 0)
//   exports.getRating = (req, res, next) => {
//     Sauce.findOne({_id: req.params.id}).then( // front end sends id
//       (sauce) => { // data from the server - record
//         // update object
//         const sauceRatingUpdate = {
//           likes: sauce.likes,
//           dislikes: sauce.dislikes,
//           usersLiked: sauce.usersLiked,
//           usersDisliked: sauce.usersDisliked
//         }
//         console.log(sauce);
  
//         // if likes are 1 then add user to usersLiked array if it does not include the user
//         if (req.body.like === 1) {
//           console.log(req.body.userId)
//           if(!sauceRatingUpdate.usersLiked.includes(req.body.userId)) { 
//             sauceRatingUpdate.usersLiked.push(req.body.userId)
//             sauceRatingUpdate.likes += 1
//             console.log(sauceRatingUpdate)
//           }
//         // if likes are -1, then add the user to the usersDisliked array
//         } else if (req.body.like === -1) {
//           console.log(sauceRatingUpdate)
//           if(!sauceRatingUpdate.usersDisliked.includes(req.body.userId)) { 
//             sauceRatingUpdate.usersDisliked.push(req.body.userId)
//             sauceRatingUpdate.dislikes += 1
//             console.log(sauceRatingUpdate)
//           }
  
//         } else if (req.body.likes === 0 && sauce.usersLiked.some(userId => userId === req.body.userId)) {
//           const index = sauce.usersLiked.findIndex(userId => userId === req.body.userId)
//           sauceRatingUpdate.usersLiked.splice(index, 1)
//           sauceRatingUpdate.likes = sauceRatingUpdate.usersLiked.length
  
//         } else if (req.body.dislikes === 0 && sauce.usersDisliked.some(userId => userId === req.body.userId)) {
//           const index = sauce.usersDisliked.findIndex(userId => userId === req.body.userId)
//           sauceRatingUpdate.usersDisliked.splice(index, 1)
//           sauceRatingUpdate.dilikes = sauceRatingUpdate.usersDisliked.length
  
//         }
  
//     // updating the sauce update object
//     Sauce.updateOne({_id: req.params.id}, sauceRatingUpdate)
//     .then(() => {
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
//     )
//    }
//   )}