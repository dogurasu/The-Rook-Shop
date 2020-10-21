// our auth Middleware validates the token (makes sure it's a legit token)
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // get the JWT sent w/ key: Authorization and value: Bearer ___
    if (req.body.headers.Authorization && req.body.headers.Authorization.startsWith('Bearer')) {
        try {
            // split the 'bearer' and 
            token = req.body.headers.Authorization.split(' ')[1] // u just want tokens, not the bearer
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // try to verify the token

            // set the user in req found by id
            req.user = await User.findById(decoded.id).select('-password');
            
            next();
        } catch(err) {
            res.status(401); // unauthorized
            throw new Error('Not authorized, token found but failed');
        }
    }

    // if token is not found, unauthorized
    if (!token) {
        res.status(401); // unauthorized
        throw new Error('Not authorized, no token');
    }
})

export { protect }