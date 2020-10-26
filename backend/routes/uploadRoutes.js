// This file contains our single route for image uploads and 
// we also put our config, validation, and etc for Multer

import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

// init storage engine w/ multer.diskStorage - pass in obj w/ 2 funcs (request file and callback)
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/"); // null cuz no error, "uploads/" -> directory where we want our uploads to go
    },
    filename(req, file, cb) {
        // we'll use whatever extension we're given (.png, .jpg, jpeg, .svg)
        // path.extname gets the extension of a filename - manually includes the dot
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) // null cuz no error, "" -> name of our file
    }
})

const checkFileType = (file, cb) => {
    // we'll offer 3 types of file types: jpg, jpeg, png
    // we'll call 'test' of the 'filetypes' regex to get a Boolean value that signifies whether the user has input a valid file extension
    const filetypes = /jpg|jpeg|png/;
    const extension_name = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    // every file has a mimetype - jpg has image/jpg so we want to check that as well

    // if extname=true which means we had a valid file type 
    // and
    // mimetype exists
    if (extension_name && mimetype) {
        return cb(null, true); // null for error
    } else { // we're missing at least 1
        return cb('Images only!'); // pass an error message in
    }
}

// this is what was pass in as middleware to our row
// make sure we pass a fileFilter - function that doesn't let us put in alllll kinds of files, only ones we allow
const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
})

// pass in 'upload' as middleware
// works w/ image state 
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router;