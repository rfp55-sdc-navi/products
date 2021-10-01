const express = require('express');
// const queries = require('./models/models.js');
const db = require('./db/database.js')

const app = express();

const port = 5000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/products', (req, res) => {
  var text = 'SELECT * FROM products LIMIT 10';
  db.query(text, (error, data) => {
    if (error) {
      res.set('status', 500).send(error)
    } else {
      res.set('status', 200).send(data)
    }
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})