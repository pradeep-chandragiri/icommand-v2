export const errorHandler = async (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error.';

    console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);
    if (err.stack) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message
    })
}