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
    console.log(req.body);
    if(req.body.pirate_image_url == ''){
      req.body.pirate_image_url = 'img/jolly.png'
    }
    Pirates.create(req.body).then((response) => {
      res.redirect('/pirates')
    })
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
    Pirates.delete(req.params.id)
      .then((response) => {
        res.redirect('/pirates')
      })
  })
router.route('/pirates/:id/edit')
  .get((req, res, next) => {
    // edit a pirate, display pre filled form.
    Pirates.getOne(req.params.id).then((response) => {
      console.log(response);
      res.render('pirates/edit', {pirate: response[0]})
    })
  })
  .post((req, res, next) => {
    console.log(req.body);
    Pirates.updateOne(req.body).then((resp) => {
      res.redirect('/pirates')
    })
  })
module.exports = router;
