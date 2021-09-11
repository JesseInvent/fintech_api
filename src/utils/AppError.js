class AppError extends Error {
    
    constructor({res, statusCode, message}) {
        return res.status(statusCode).json({ message })
    }
}

export default AppError;