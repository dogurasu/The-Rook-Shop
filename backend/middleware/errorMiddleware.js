const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}


const errorHandler = (err, req, res, next) => {
    // set the error to be a 500 if the response's status code is 200 or 'error' is set to be 'res.statusCode' otherwise
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // set res.status to whatever that status code is
    res.status(statusCode);
    res.json({
        message: err.message,
        // if the environment is production, just return null, else you want to get the stack from the error object
        stack: process.env.NODE_ENV === 'product' ? null : err.stack,
    })
}

export { notFound, errorHandler };