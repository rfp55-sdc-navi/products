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

app.get('/products/:product_id/related', (req, res) => {
  var id = req.params.product_id
  var params = [id];
  var text = 'SELECT * FROM related WHERE current_product = $1'

  db.query(text, params, (error, data) => {
    if (error) {
      res.set('status', 500).send(error)
    } else {
      Promise.resolve(
        data.rows.map((row) => {
        return row.related_product;
      }))
        .then((data) => res.set('status', 200).send(data))
    }
  })
})

app.get('/products/:product_id', (req, res) => {

  var id = req.params.product_id;
  var params = [id];
  var text = 'SELECT * FROM products WHERE id = $1';

  db.query(text, params, (error, data) => {
    if (error) {
      res.set('status', 500).send(error)
    } else {
      res.set('status', 200).send(data.rows)
    }
  })
})

app.get('/products', (req, res) => {

  var count = req.query.count || '5';
  var offset = ((req.query.page - 1) * count) || '0';
  var params = [offset, count]
  var text = 'SELECT * FROM products ORDER BY id ASC OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY'

  db.query(text, params, (error, data) => {
    if (error) {
      res.set('status', 500).send(error)
    } else {
      res.set('status', 200).send(data.rows)
    }
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})