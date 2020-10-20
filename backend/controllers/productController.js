import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    fetch all products
// @route   GET /api/products
// @access  Public route
//      access  - some routes need a token
//              - e.g. to purchase a product you need to be logged in; you need to send a token to specific routes (private if purchasing)
//              - in this case, this is a public route to our API
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    // purposefully output an error to test our error catching in Redux
    // res.status(401);
    // throw new Error('Not Authorized');

    res.json(products);
})

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
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
})

export {
    getProducts,
    getProductById
}