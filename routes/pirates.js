var express = require('express');
var router = express.Router();
var Pirates = require('../lib/Pirates')

// route to redirect to pirates table
router.get('/', (req, res, next) => {
  res.redirect('/pirates')
})
router.route('/pirates')
  .get((req, res, next) => {
    Pirates.getAll().then((response) => {
      // render pirate table template
      res.render('pirates/index', {pirates: response})
      // res.json(response)
    })
  })
  .post((req, res, next) => {
    // create a new pirate
  })
router.get('/pirates/new', (req, res, next) => {
  // display new pirate form
  res.render('pirates/new')
})
router.post('/pirates/:id', (req, res, next) => {
  // update an existing pirate
})
router.route('/pirates/:id/delete')
  .get((req, res, next) => {
    // delete a pirate
  })
  .post((req, res, next) => {
    // delete a pirate
  })
router.get('/pirates/:id/edit',(req, res, next) => {
  // edit a pirate, display pre filled form.
})

  // res.render('pirates/index');

module.exports = router;
