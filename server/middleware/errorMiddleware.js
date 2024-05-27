import dotenv from "dotenv";
dotenv.config();

//error handler for invalid routes : 
const notFoundHandler = (req,res,next)=>{
    const notFoundError = new Error(`Not found : '${req.originalUrl}'`);
    res.status(404);
    next(notFoundError);
}

//common handler for all types of Error
const appErrorHandler = (err, req, res, next)=>{
    const statusCode = res.statusCode || 500;
    const status = `${statusCode}`.startsWith("4") ? "Client error" : "Server error";

    res.status(statusCode).json({
        status,
        message: err.message,
        // stack: err.stack
    });
};

export {notFoundHandler, appErrorHandler}
