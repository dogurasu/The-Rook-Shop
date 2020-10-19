import express from 'express';
import  Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// initialize an instance of Express's Router
const router = express.Router();

// default route will be "api/v1/products/""
// since every single one of our routes will be asynchronous, we can either utilize 'try, catch' blocks or 'express-async-handler
// @desc    fetch all products
// @route   GET /api/products
// @access  Public route
//      access  - some routes need a token
//              - e.g. to purchase a product you need to be logged in; you need to send a token to specific routes (private if purchasing)
//              - in this case, this is a public route to our API
router.get('/', asyncHandler(async (req, res) => {
    // passing in an empty object returns everything
    const products = await Product.find({});
    res.json(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404); // .json({ message: "Product not found"})
        throw new Error('Product not found');
    }
    // try {
    //     // const product = products.find(p => p._id === req.params.id);
    //     const product = await Product.findById(req.params.id);

    //     if (product) {
    //         res.json(product);
    //     } else {
    //         res.status(404).json({ message: "Product not found"})
    //     }
    // } catch(err) {
    //     console.log(`Error: ${err}`);
    // }
}))

export default router;