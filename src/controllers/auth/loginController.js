import User from "../../models/User.js";
import AppError from "../../utils/AppError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { compareHash } from "../../utils/bcryptFunction.js"
import { createAuthToken } from "../../utils/jwtFunction.js";
import { sterilizeUserModel } from "../../utils/sterilizers.js"

export default asyncHandler(async (req, res, next) => {

    if (!req.body.email || !req.body.password) {
        next(
            new AppError({res, statusCode: 400, message: 'Please provide email and password 🙂'})
        )
    }

    let user = await User.findOne({ 
        where: { email: req.body.email } 
    })

    if(!user) {
        next(
            new AppError({res, statusCode: 400, message: 'User does not exists 🙂'})
        )
    }

    const comparePassword = await compareHash({ hashed: user.password, string: req.body.password })

    if(comparePassword === false) {
        next(
            new AppError({res, statusCode: 400, message: 'Invalid login credentials' })
        )
    }
    
    const auth_Token = createAuthToken(user)

    user = sterilizeUserModel(user.get())

    return res.status(200).json({ message: 'Login successful', user, auth_Token  })


})