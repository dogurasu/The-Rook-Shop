import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

// bring in env variables
dotenv.config();

// this seeder isn't connected to our server so we have to initialize a DB connection ourselves
connectDB();

// this is async bc we're dealing w/ Mongooose/MongoDB so we want to make sure we're patient and wait for results
const importData = async () => {
    try {
        // clear all the previous data we've had in our DB
        // we don't want to import anything w/ stuff already in our DB
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // insert the user data we have
        // createdUsers = [array of users created with the User.insertMany call]
        const createdUsers = await User.insertMany(users);

        // we have a connection between users and products so we need the Admin id to pass to the function that inserts our product data
        // we want the Admin to be the user for our product (that registered the product)
        // Admin is the first user in the users we just passed/created
        const adminUser = createdUsers[0]._id;

        // use the [... ] spread operator to pass all the object properties that are already present
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse)
        process.exit();

    } catch(err) {
        console.error(`${error}`.red.inverse)
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        // clear all the previous data we've had in our DB
        // we don't want to import anything w/ stuff already in our DB
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse)
        process.exit();

    } catch(err) {
        console.error(`${error}`.red.inverse)
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}