const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farm', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Yhteys tietokantaan avattu')
}).catch( err => {
    console.log('tuli pikku errori!')
    console.log(err)
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//TÄRKEÄÄÄÄ
app.get('/products', async (req, res) => {
    //find everything
    const products = await Product.find({})
    
    res.render('products/index', {products})
})

app.listen(3000, () => {
    console.log('local server yhdistetty')
})