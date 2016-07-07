var express = require('express');
var router = express.Router();
var Pirates = require('../lib/Pirates')

router.get('/pirates', function(req, res, next) {
  // res.render('pirates/index');
  Pirates.getAll().then((response) => {
    res.json(response)
  })
});


module.exports = router;
