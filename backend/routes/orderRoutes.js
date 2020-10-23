import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// post request to /api/v1/orders - then we should be able to call that function out
router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;