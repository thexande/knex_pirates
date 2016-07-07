var env = "heroku"
var knexfile = require('../knexfile')[env]
module.exports = require('knex')(knexfile)
