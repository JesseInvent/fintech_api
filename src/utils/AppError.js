class AppError extends Error {
    
    constructor(responseObject, statusCode, message) {
        return responseObject.status(statusCode).json({ message })
    }
}

export default AppError;