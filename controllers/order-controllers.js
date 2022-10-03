const Order = require('../models/Order')
const Product = require('../models/Product')
const catchAsync = require('../utils/catch-async')
const ErrorObject = require('../utils/error')
const QueryMethod = require('../utils/query')

//Create Order
exports.createOrder =  catchAsync(async (req, res, next) => {

    const { productId, quantity } = req.body
    const userId = req.user.id

    const prod = await Product.findById(productId)
    unitPrice = prod.amount
    
    if(!prod.available) {
        return next(new ErrorObject( `The product ${prod.name} is not available`, 400))
    }

    if(prod.quantity < quantity) {
        return next(new ErrorObject( `The product ${prod.name} has ${prod.quantity} available`, 400))
    }

    amount = quantity * unitPrice

    const order = await Order.create({ userId, productId, quantity, unitPrice, amount })

    res.status(200).json({
        status: 'success',
        data: {order}
    })
}

)

//Get all Orders
exports.getAllOrders = catchAsync(async (req, res, next) => {
  let queriedOrders = new QueryMethod(Order.find(), req.query)
  .sort()
  .filter()
  .limit()
  .paginate();
let order = await queriedOrders.query;
        res.status(200).json({
            status: 'success',
            results: order.length,
            data: order
        })
})


//Get an order
exports.getOneOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(req.user.id !== order.userId.toString()) {
        return next(new ErrorObject( `You are not authorized!!!!!!!`, 403))
    }

    if (!order) {
        return next(
          new ErrorObject(`There is no order with the id ${req.params.id}`, 400)
        );
      }

        res.status(200).json({
            status: 'success',
            data: order
})
})

//Update order
exports.updateOrder = catchAsync(async (req, res, next) => {
    
    const order = await Order.findById(req.params.id)

    if(req.user.id !== order.userId.toString()) {
        return next(new ErrorObject( `You are not authorized!!!!!!!`, 403))
    }
        if (!order) {
            return next(new ErrorObject( `There is no Order with Id ${req.params.id}`, 400))
        }
        const quantity = req.body.quantity

        const prod = await Product.findById(order.productId)
        if(prod.quantity < quantity) {
            return next(new ErrorObject( `The product ${prod.name} has ${prod.quantity} available`, 400))
        }

        amount = quantity * prod.amount

        const update = {amount, quantity}
        
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { $set: update}, {
            new: true,
        })

        res.status(200).json({
            status: 'success',
            data: {updatedOrder}
        })


})

//Delete an Order
exports.deleteOrder = catchAsync( async (req, res, next) => {

    const order = await Order.findById(req.params.id)
        if (!order) {
            return next(new ErrorObject( `There is no Order with Id ${req.params.id}`, 400))
        }

        await Order.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            status: 'Order deleted successfully'
        })
    })
