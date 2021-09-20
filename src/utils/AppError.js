class AppError extends Error {
    
    constructor({res, statusCode, message}) {
        return res.status(statusCode).json({ status: 'fail', message })
    }
}

export default AppError;