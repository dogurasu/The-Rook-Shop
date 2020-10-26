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

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    // fetch order, get name, email etc associated
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
})

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email: req.body.payer.email_address
        }

        const updatedOrder = await order.save(); // save this stuff

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
})

// @desc    Update order to delivered
// @route   PUT /api/v1/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt= Date.now();

        const updatedOrder = await order.save(); // save this stuff

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
})

// @desc    Get logged in user's orders
// @route   GET /api/v1/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find( { user: req.user._id } );
    res.json(orders);
})

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find( {} ).populate('user', 'id name');
    res.json(orders);
})


export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getAllOrders, updateOrderToDelivered };