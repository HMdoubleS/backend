const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

const pool = require('../models/pool');


exports.signup = (req, res, next) => {


};

exports.login = (req, res, next) => {


};












// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10).then(
//         (hash) => {
//             const user = {
//                 userName: req.body.userName,
//                 email: req.body.email,
//                 password: hash,
//                 userId: req.body.userID
//             };
//             console.log(user);

//             pool.query(`INSERT INTO users(userName, email, password, userId) VALUES ($1, $2, $3, $4)`,
//             [user.userName, user.email, user.password, user.userId], (error, results) => {
//                 if (error) {
//                     throw error
//                 }
//                 res.status(201).send('User created successfully!');
//             }) .catch (
//               (error) => {
//                 res.status(400).json({
//                   error: error
//                 });
//             }
//         );
//     })
// };

// exports.login = (req, res, next) => {

// };

// TODO: how to use the pool to login?
// exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email }).then(
//       (user) => {
//         if (!user) {
//           return res.status(401).json({
//             error: new Error('User not found!')
//           });
//         }
//         bcrypt.compare(req.body.password, user.password).then(
//           (valid) => {
//             if (!valid) {
//               return res.status(401).json({
//                 error: new Error('Incorrect password!')
//               });
//             }
//             const token = jwt.sign(
//               { userId: user._id },
//               'RANDOM_TOKEN_SECRET',
//               { expiresIn: '24h' });
//             res.status(200).json({
//               userId: user._id,
//               token: token
//             });
//           }
//         ).catch(
//           (error) => {
//             res.status(500).json({
//               error: error
//             });
//           }
//         );
//       }
//     ).catch(
//       (error) => {
//         res.status(500).json({
//           error: error
//         });
//       }
//     );
//   };