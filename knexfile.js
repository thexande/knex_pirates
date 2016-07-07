module.exports = {
  development: {
    client: 'pg',
    connection: "postgres://localhost/pirates"
  },
  heroku: {
    client: 'pg',
    ssl: true,
    connection: process.env.DATABASE_URL

  }
}
