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
})

// @desc   Delete a single product
// @route  DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
    // first find the product
    const product = await Product.findById(req.params.id);

    // any admin could make or delete a product - u can change it so that the admin who created the product can only delete it
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' })
    } else {
        res.status(404); // .json({ message: "Product not found"})
        throw new Error('Product not found');
    }
})

export {
    getProducts,
    getProductById,
    deleteProduct
}