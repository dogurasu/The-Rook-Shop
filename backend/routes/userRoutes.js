import express from 'express';
const router = express.Router();
import {
    authUser,
    getUserProfile,
    registerUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser); // not protected, public
router.post('/login', authUser);
// we want to protect this route so we just add our middleware as our first arg
router.route('/profile').get(protect, getUserProfile);

export default router;