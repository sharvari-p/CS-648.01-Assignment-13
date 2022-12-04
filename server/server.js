var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
require('dotenv').config();

const dbURL = process.env.dbURL

app.use(express.static(__dirname))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

const Product = mongoose.model('products', {
  productid: { type: Number, default: Date.now },
  category: { type: String, default: '' },
  price: { type: Number, default: 0 },
  name: { type: String, default: '' },
  instock: {type: Boolean, default: true}
})

app.get('/products/get', (req, res) => {
  Product.find({}, (error, products) => {
    res.send(products)
  })
})

app.post('/products/create', (req, res) => {
  console.log("Creating product");
  const product = new Product(req.body)
  product.save((error) => {
    if(error) {
      res.sendStatus(500)
    }
    else {
      res.sendStatus(200)
    }
  })
})

app.post('/products/delete/:productId', (req, res) => {
  const productId = req.params.productId || ''
  Product.deleteOne({productid: productId}, (error) => {
    if(error) {
      res.sendStatus(500)
    }
    else {
      res.sendStatus(200)
    }
  })
})

app.post('/products/update/:productId', (req, res) => {
  const productId = req.params.productId || ''
  //console.log('To be updated product id ' + productId)
  const product = new Product(req.body)
  //console.log('Requested update ' + JSON.stringify(req.body))
  Product.updateOne({productid: productId}, req.body, (error) => {
    if(error) {
      console.log(error)
      res.sendStatus(500)
    }
    else {
      res.sendStatus(200)
    }
  })
})

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
  console.log('MongoDB database connection', error)
})

var server = app.listen(3000, () => {
  console.log('Server is listening on the port', server.address().port)
})
