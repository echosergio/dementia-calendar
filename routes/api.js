var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/message', function (req, res, next) {
  db.Message.findAll({
      order: [
        [db.sequelize.col('Message.createdAt'), 'DESC']
      ]
    })
    .then(messages => {
      res.send(messages);
    })
});

router.post('/message', function (req, res, next) {
  db.Message.create({
    user: req.body.user,
    text: req.body.text
  }).then(() => {
    res.sendStatus(200);
  }).catch(err =>
    next(err)
  )
});

module.exports = router;