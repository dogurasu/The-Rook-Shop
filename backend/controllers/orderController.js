import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
    } = req.body;

    // if an order comes thru, we want to make sure it's not empty
    if (orderItems && orderItems.length === 0) {
        res.status(400); // bad request
        throw new Error('No order items');
        return;
    } else { // order exists and it has at least 1 item in it
        // instantiate a new order object by passing in a bunch of properties related to the order
        //      - since this is a protected route, we need JWT
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        // save this order into our database
        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }

})

export { addOrderItems };