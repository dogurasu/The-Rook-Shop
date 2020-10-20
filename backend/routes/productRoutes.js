import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

// initialize an instance of Express's Router
const router = express.Router();

// default route will be "api/v1/products/""
// since every single one of our routes will be asynchronous, we can either utilize 'try, catch' blocks or 'express-async-handler
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;