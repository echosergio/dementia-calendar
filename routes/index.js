var express = require('express');
var suncalc = require('suncalc');
var fs = require('fs');
var router = express.Router();

router.get('/', function (req, res, next) {
  var date = new Date()

  // Madrid latitude: 40.416775, longitude: -3.703790
  var times = suncalc.getTimes(date, 40.41, -3.70);

  if (times.sunrise.getHours() < date.getHours() && date.getHours() <= times.sunset.getHours())
    var mode = 'day'
  else
    var mode = 'night'

  res.render('index', {
    mode: mode
  });
});

module.exports = router;