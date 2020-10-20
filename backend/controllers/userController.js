import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    AUTH user & ultimately get token
//      - first route will be authenticate user, so we want to validate email and pw
//      - then we'll send back some data
//      - ultimately, we'll want to send back a token that we can save on the client so the user can access protected routes later
// @route   POST /api/v1/users/login
// @access  Public route
const authUser = asyncHandler(async (req, res) => {
    // first, we want to get data from the body 
    // when we set up a form on the frontend and submit it, we're going to send a request with data in the body
    const { email, password } = req.body;

    // find the user using the provided email
    const user = await User.findOne({ email })

    // we need to:
    //      - check if the user exists
    //      - check if the input plaintext password matches
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password');
    }
})

export {
    authUser
}