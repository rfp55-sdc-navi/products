const config = require('./config.js');
const { Pool } = require('pg')

const pool = new Pool ({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  max: config.max,
  port: config.port
})

pool.on('error', (error, client) => {
  console.error('Error in pool connection', error)
  process.exit(-1)
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, (error, data) => {
      if (error) {
        console.log('error in pool.query', error)
        callback(error)
      } else {
        callback(null, data)
      }
    })
  }
}



//SINGLE CLIENT OPTION

/*
const { Pool, Client } = require('pg')
const config = require('./config.js');

const client = new Client({
  host: config.host,
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
*/