var express = require('express');
var suncalc = require('suncalc');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  var date = new Date()
  var times = suncalc.getTimes(date, 40.41, -3.70);

  var nowStr = date.getHours() + ':' + date.getMinutes();
  var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
  var sunsetStr = times.sunset.getHours() + ':' + times.sunset.getMinutes();

  if (sunriseStr > nowStr > sunsetStr)
    var mode = 'day'
  else
    var mode = 'night'

  res.render('index', {
    title: 'ni',
    mode: mode
  });
});

module.exports = router;