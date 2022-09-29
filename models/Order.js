const mongoose = require('mongoose')

// Product Id/name, Number(or quantity) of products, User Id, total amoun

const orderSchema = new mongoose.Schema({
    userId: {
        //mongoose.Schema.ObjectId
        type: String,
        required: [true, 'order must have userId'],
        // ref: 'User'
    },
    product: [
        {
            productId : {
                // type: mongoose.Schema.ObjectId,
                type: String,
                required: [true, 'product id is required'],
                // ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            },
            amount: {
                type: Number,
                required: [true, 'product amount is required']
            }
        }
    ],
    totalAmount: {
        type: Number,
    }
})



const Order = mongoose.model('Order', orderSchema)

module.exports = Order;