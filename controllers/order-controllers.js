const Order = require('../models/Order')
const catchAsync = require('../utils/catch-async')

exports.createOrder =  catchAsync(async (req, res, next) => {
    // NO AUTHORIZATION YET
    const { userId, product } = req.body
    const order = await Order.create({ userId, product })

    res.status(200).json({
        status: 'success',
        data: {order}
    })
}

)

exports.getAllOrders = catchAsync(async (req, res, next) => {
    const order = await Order.find()
        res.status(200).json({
            results: order.length,
            data: order
        })
})

exports.getOneOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
        res.status(200).json({
            data: order
})
})

exports.updateOrder = catchAsync(async (req, res, next) => {
    
        const order = await Order.findById(req.params.id)
        if (!order) {
            return next(new ErrorObject( `There is no Order with Id ${req.params.id}`, 400))
        }
        

        const userId = req.body.userId = order.userId
        const product = [
            {
                productId : (req.body.product[0].productId === undefined ? order.product[0].productId : req.body.product[0].productId),
                quantity : (req.body.product[0].quantity === undefined ? order.product[0].productId : req.body.product[0].quantity),
                amount : (req.body.product[0].amount === undefined ? order.product[0].amount : req.body.product[0].amount)
            }
        ]           
                    

        const update = { userId, product };

        const updatedUser = await Order.findByIdAndUpdate(req.params.id, update, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            status: 'success',
            data: {updatedUser}
        })


})

exports.deleteOrder = catchAsync( async (req, res, next) => {

    const order = await Order.findById(req.params.id)
        if (!order) {
            return next(new ErrorObject( `There is no Order with Id ${req.params.id}`, 400))
        }

        await Order.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'Order deleted successfully'
        })
    })
