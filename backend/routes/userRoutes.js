import express from 'express';
const router = express.Router();
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser); // not protected, public
router.post('/login', authUser);
// we want to protect these route so we just add our middleware as our first arg
// depending on the request we receive, we'll route req to .get or .put
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;