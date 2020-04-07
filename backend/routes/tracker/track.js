var router = require('express').Router();
var User = require('../../db/userSchema');
var moment = require('moment');
var arrayReduce = require('./utils');

router.post('/record', function(req, res){
  const { email, calories } = req.body
  var dateString = moment().format('YYYY-MM-DD')
  var tracked = {
    date: dateString,
    calories: calories
  }

  User.findOneAndUpdate({ email: email}, { $push: { tracker: tracked } }, function(err, docs){
    if (err || docs.length === 0) {
      res.json(400, {
        error: 1,
        errMsg: 'Not found'
      });
    } else {
      res.json({
        success: true,
      });
    }
  });
});

router.post('/getCalToday', function(req, res) {
  const { email } = req.body
  var day = moment().format('YYYY-MM-DD')
  var sum = 0;

  User.find({ email: email }, function(err, docs) {
    if (err || docs.length === 0) {
      res.json(400, {
        error: 1,
        errMsg: 'Not found'
      });
    } else {
      var array = docs[0].tracker.filter(function(today){
        return today.date === day;
      });
      array.map(ele => 
        sum += ele.calories
      );
      res.json({
        success: true,
        sum: sum
      });
    }
  });
});

router.post('/calorieData', function(req, res) {
  const { email } = req.body
  
  User.find({ email: email }, function(err, docs) {
    if (err || docs.length === 0) {
      res.json(400, {
        error: 1,
        errMsg: 'Not found'
      });
    } else {
      var array = docs[0].tracker;
      var newArray = arrayReduce(array);
      res.json({
        success: true,
        data: newArray
      })
    }
  });
});


module.exports = router;