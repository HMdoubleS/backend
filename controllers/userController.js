const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/pool');
const signupSchema = require('../models/signupSchema');
const signupValidation = require('../middleware/validation/signupValidation');



// TODO: signup does not work in postman -- returns data and salt argumant required
exports.signup = (req, res, next) => {
  if (signupValidation(signupSchema)) {
    validData = true;
  }
  const salt = bcrypt.genSalt(10).then(
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = {
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash(req.body.password, salt),
        };
        console.log(user);

        pool.query(`SELECT * FROM users WHERE email = $1`, [req.body.email],
        (error, userFound) => {
          if (error) {
            return res.status(401).json({
              error: error
            });
          }
          if (userFound.rowCount != 0) {
            return res.status(401).json('Email already registered')
          } else {
            pool.query(`INSERT INTO users(userId, firstName, lastName, email, password) VALUES ($1, $2, $3, $4, $5)`,
            [user.userId, user.firstName, user.lastName, user.email, user.password], (error, res) => {
              if (error) {
                throw error
              }
              res.status(201).send('User created successfully!')
            }) 
          }
      })
  }))
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

// getting user profile
exports.getOneUser = (req, res, next) => {

};

// MODIFY user
exports.modifyUser = (req, res, next) => {

};

// DELETE user
exports.deleteUser = (req, res, next) => {

};


