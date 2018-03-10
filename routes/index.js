var express = require('express');
var suncalc = require('suncalc');
var fs = require('fs');
var router = express.Router();

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

  fs.readFile('message', {
    encoding: 'utf-8'
  }, function (err, contents) {
    if (!err) {
      res.render('index', {
        mode: mode,
        message: contents
      });
    } else {
      console.log(err);
    }
  });
});

router.get('/message', function (req, res, next) {
  fs.readFile('message', {
    encoding: 'utf-8'
  }, function (err, contents) {
    if (!err) {
      res.json({
        text: contents
      });
    } else {
      console.log(err);
    }
  });
});

router.post('/message', function (req, res, next) {
  fs.writeFile('message', req.body.text, function (err) {
    if (err) {
      return console.log(err);
    }

    res.json({
      status: 'success'
    });
  });
});

module.exports = router;