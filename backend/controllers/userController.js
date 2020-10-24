import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

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
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password');
    }
})

// @desc    Register a new user
// @route   POST /api/v1/users
// @access  Public 
const registerUser = asyncHandler(async (req, res) => {
    // we also want name for users
    const { name, email, password } = req.body;

    // find the user using the provided email
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // basically syntactic sugar for the .save method (we added a 'pre' .save member method remember)
    const user = await User.create({ 
        name,
        email,
        password, // encrypted thru the middleware we created ( can be found in the userModel -> pre .save )
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc    GET user profile
// @route   GET /api/v1/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);    

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            // the password will be encrypted automatically (in the save()) bc of the middleware we installed in the userModel
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        // update user profile
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin -- it's private AND you have to be an admin
const getUsers = asyncHandler(async (req, res) => {
    // pass an empty obj because we want to get all users
    const users = await User.find({});
    res.json(users);
})

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin 
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (user) {
        await user.remove();
        res.json({ message: 'User removed'});
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser
}