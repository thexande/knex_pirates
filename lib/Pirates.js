var db = require('../config/db')
module.exports = {
  create : (pirate) => {
    console.log("creating a pirate!!!!", pirate);
    return db('pirates').insert(pirate)
  },
  getOne : (id) => {
    return db('pirates').where('id', id)
  },
  delete : (id) => {
    return db('pirates').where('id', id).del()
  },
  getAll : () => {
    return db('pirates')
  },
  updateOne : (pirate) => {
    return db('pirates').where('id', pirate.id).update(pirate)
  }
}
