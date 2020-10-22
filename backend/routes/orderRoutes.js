import express from 'express';
const router = express.Router();
import {
    addOrderItems
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// post request to /api/v1/orders - then we should be able to call that function out 
router.route('/').post(protect, addOrderItems);

export default router;