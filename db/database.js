const config = require('../config.js');

const { Pool, Client } = require('pg')

const client = new Client({
  host: 'localhost',
  user: 'caitlinkinney',
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

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, (error, data) => {
      if (error) {
        console.log('error in client.query', error)
        callback(error)
      } else {
        // console.log('query results', data.rows[0])
        callback(null, data)
      }
    })
  },
}

/* example...
const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'caitlinkinney',
  database: 'products',
  //password?
  host: 'localhost',
  port: 5432
});

module.exports = pool;

*/