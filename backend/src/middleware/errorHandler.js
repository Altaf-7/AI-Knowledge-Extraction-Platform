const errorHandler = (err, req, res, next) => {

    console.error(err);

    // Already handled
    if (res.headersSent) {
        return next(err);
    }

    return res.status(err.statusCode || 500).json({

        success: false,

        message:
            err.message ||
            "Something went wrong.",

        errorCode:
            err.errorCode ||
            "INTERNAL_SERVER_ERROR"

    });

};

module.exports = errorHandler;