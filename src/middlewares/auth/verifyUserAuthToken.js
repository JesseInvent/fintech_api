import AppError from "../../utils/AppError.js"
import asyncHandler from "../../utils/asyncHandler.js"
import { verifyAndDecodeAuthToken } from "../../utils/jwtFunction.js"

export default asyncHandler(async (req, res, next) => {
   
    const authorizationHeader = req.headers['authorization'];

    if(!authorizationHeader) {
        next(
            new AppError({res, statusCode: 403, message: 'Authentication failed'})
        )
    }

   const auth_token = authorizationHeader.split(' ')[1]

   const decodedUser = verifyAndDecodeAuthToken(auth_token)

   if(!decodedUser) {
        next(
            new AppError({res, statusCode: 403, message: 'Authentication failed'})
        )
   }

   req.userId = decodedUser.id

   next()

})  