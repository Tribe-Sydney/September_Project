const mongoose = require('mongoose')

// Product Id/name, Number(or quantity) of products, User Id, total amoun

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'order must have userId'],
        ref: 'User'
    },
    productId : {
        type: mongoose.Schema.ObjectId,
            required: [true, 'product id is required'],
            ref: 'Product'
        },
            quantity: {
                type: Number,
                default: 1
            },
            unitPrice: {
                type: Number,
                required: [true, 'product amount is required']
            },
    amount: {
        type: Number,
    }
})



const Order = mongoose.model('Order', orderSchema)

module.exports = Order;