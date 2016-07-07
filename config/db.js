var env = "heroku"
// var env = "development"
var knexfile = require('../knexfile')[env]
module.exports = require('knex')(knexfile)
