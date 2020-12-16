const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')


const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farm', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Yhteys tietokantaan avattu')
}).catch( err => {
    console.log('tuli pikku errori!')
    console.log(err)
})

app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

const categories = ['fruit', 'vegetable', 'dairy']

//TÄRKEÄÄÄÄ
app.get('/products', async (req, res) => {
    //find everything
    const { category } = req.query
    if(category) {
        const products = await Product.find({category: category})
        res.render('products/index', {products, category})
    } else {
    const products = await Product.find({})    
    res.render('products/index', {products, category: 'All'})
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories})
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
   res.redirect(`/products/${newProduct._id}`)
})


app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    const tuote = await Product.findById(id)
    console.log(tuote)
    res.render('products/show', { tuote })

})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    const tuote = await Product.findById(id)
    res.render('products/edit', { tuote, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new:true})
    console.log(req.body)
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log('local server yhdistetty')
})