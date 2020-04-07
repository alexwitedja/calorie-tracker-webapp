var router = require('express').Router();
var User = require('../../db/userSchema');
var mifflinCalculator = require('./mifflinstjeor');

router.post('/mifflin', function (req, res) {
  const { weight, height, age, gender, exercise } = req.body;
  const recommendation = mifflinCalculator(weight, height, age, gender, exercise);
  const mildWeightLoss = parseInt(recommendation * 0.90);
  const weightLoss = parseInt(recommendation * 0.81);
  const extremeWeightLoss = parseInt(recommendation * 0.61);
  res.json({
    success: true,
    weight: [
      { type: 'Maintain weight', kcal: recommendation },
      { type: 'Mild weight loss', kcal: mildWeightLoss },
      { type: 'Weight loss', kcal: weightLoss },
      { type: 'Extreme weight loss', kcal: extremeWeightLoss }
    ]
  });
});


router.post('/getGoal', function (req, res) {
  const { email } = req.body;
  User.find({ email: email }, function (err, docs) {
    if (err || docs.length === 0) {
      res.json(400, {
        error: 1,
        errMsg: 'Not found'
      });
    } else {
      res.json({
      success: true,
      goal: docs[0].goal
    });
    }
  });
});

router.post('/preference', function (req, res) {
  const { email, pref } = req.body;
  const getUser = User.findOneAndUpdate({ email: email }, { goal: pref }, function (err, docs) {
    if (err || docs.length === 0) {
      res.json(400, {
        error: 1,
        errMsg: 'Not found'
      });
    } else {
      res.json({
        success: true,
        msg: 'Succesfully updated'
      });
    }
  });
});

module.exports = router;