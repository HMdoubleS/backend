const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/pool');
const signupSchema = require('../models/signupSchema');
const signupValidation = require('../middleware/validation/signupValidation');

exports.signup = (req, res, next) => {
  if (signupValidation(signupSchema)) {
    validData = true;
  }
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const user = {
                userId: req.body.userId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            };
            console.log(user);

            pool.query(`INSERT INTO users(userId, firstName, lastName, email, password) VALUES ($1, $2, $3, $4, $5)`,
            [user.userId, user.firstName, user.lastName, user.email, user.password], (error, res) => {
                if (error) {
                    throw error
                }
                res.status(201).send('User created successfully!');
            }) .catch (
              (error) => {
                res.status(400).json({
                  error: error
                });
            }
        );
    })
};

//TODO: finish this 
exports.login = (req, res, next) => {
    pool.query(`SELECT userId FROM users, WHERE user.userId = $1`,
    [req.body.email],
    (error, user) => {
        if (error) {
            return res.status(401).json({
                error: error,
            });
        }
        if (!user) {
            return res.status(401).json({
                error: new Error('user not found')
            });
        }
        bcrypt.compare(req.body.password, user.password).then(
            (valid) => {
              if (!valid) {
                return res.status(401).json({
                  error: new Error('Incorrect password!')
                });
              }
              const token = jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
              res.status(200).json({
                userId: user._id,
                token: token
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    };


exports.deleteUser = (req, res, next) => {

};


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