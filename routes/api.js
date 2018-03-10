var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/message', function (req, res, next) {
  db.Message.findAll({
      order: [
        [db.sequelize.col('Message.createdAt'), 'DESC']
      ]
    }).then(messages => {
      res.send(messages);
    })
});

router.post('/message', function (req, res, next) {
  console.log(JSON.stringify(req.body))
  db.Message.create({
    username: req.body.user.username,
    text: req.body.message.text
  }).then(() => {
    res.sendStatus(200);
  }).catch(err =>
    next(err)
  )
});

module.exports = router;