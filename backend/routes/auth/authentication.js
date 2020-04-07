var router = require('express').Router();
var User = require('../../db/userSchema');
var withAuth = require('../withAuth')
var jwt = require('jsonwebtoken')

const secret = 'mysecretsshhh';

router.post('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

router.post('/register', function(req, res) {
    const { email, password } = req.body;
    // console.log(email)
    const user = new User({ email, password });
    user.save(function(err) {
      if (err) {
        console.log(err);
        res.status(500)
          .send("Error registering new user please try again.");
      } else {
        res.status(200).send("Welcome to the club!");
      }
    });
});

router.post('/login', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
        error: 'Internal error please try again'
      });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
          });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.status(200)
            .json({
              token: token
            })
        }
      });
    }
  });
});

module.exports = router;