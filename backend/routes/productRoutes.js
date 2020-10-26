import express from 'express';
import { 
    getProducts, 
    getProductById, 
    deleteProduct, 
    updateProduct,
    createProduct,
    createProductReview
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
// initialize an instance of Express's Router
const router = express.Router();

// default route will be "api/v1/products/""
// since every single one of our routes will be asynchronous, we can either utilize 'try, catch' blocks or 'express-async-handler
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

// for product reviews
router.route('/:id/reviews')
    .post(protect, createProductReview)

router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;