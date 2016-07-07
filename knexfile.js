module.exports = {
  development: {
    client: 'pg',
    connection: "postgres://localhost/pirates"
  },
  heroku: {
    client: 'pg',
    debug: true,
    connection: {
      host     : process.env.PG_HOST || 'localhost',
      user     : process.env.PG_USER || 'postgres',
      password : process.env.PG_PASSWORD || 'postgres',
      database : process.env.PG_DB || 'db',
      charset  : 'utf8'
  }
  }
}
