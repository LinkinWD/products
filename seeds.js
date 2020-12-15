const mongoose = require('mongoose')

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farm', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Yhteys tietokantaan avattu')
}).catch( err => {
    console.log('tuli pikku errori!')
    console.log(err)
})

/* const p = new Product({
    name: 'viinirypäle',
    price: 0.99,
    category: 'fruit'
})

p.save().then(e => {
    console.log(e)
})
.catch(e => {
    console.log(e)
}) */
const seedProducts = [
    {
        name: 'appelsiini',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'maito',
        price: 1,
        category: 'dairy'
    },
    {
        name: 'potato',
        price: 1.99,
        category: 'vegetable'
    },
    {
        name: 'carrot',
        price: 0.99,
        category: 'vegetable'
    },
    {
        name: 'apple',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'piima',
        price: 1.99,
        category: 'dairy'
    }
]
Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(e => console.log(e))


