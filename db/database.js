const config = require('../config.js');

const { Pool, Client } = require('pg')

const client = new Client({
  host: 'localhost',
  user: config.user,
  database: 'products',
  port: 5432,
})

const connection = client.connect((err) => {
  if (err) {
    console.error('DB connection -', err.stack)
  } else {
    console.log('connected to DB')
  }
})


module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, (error, data) => {
      if (error) {
        console.log('error in client.query', error)
        callback(error)
      } else {
        callback(null, data)
      }
    })
  },
}
