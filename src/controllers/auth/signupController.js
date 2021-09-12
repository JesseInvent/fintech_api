import AppError from '../../utils/AppError.js'
import asyncHandler from '../../utils/asyncHandler.js'
import User from '../../models/User.js'
import { createAuthToken } from '../../utils/jwtFunction.js'
import { sterilizeUserModel } from "../../utils/sterilizers.js"


export default asyncHandler( async (req, res, next) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        next(
           new AppError({ res, statusCode:400, message: "You missed a required field, please check fields submitted 🙂"})
        )
    }

    if (req.body.password !== req.body.confirm_password) {
        next(
            new AppError({ res, statusCode:400, message: "Passwords do not 😔"})
         )
    }

    if (req.body.password.length < 7) {
        next(
            new AppError({ res, statusCode:400, message: "Passwords too short, must not be less 6 digits 🙂"})
        )
    }

    let user = await User.create({...req.body})
  
    const auth_token = createAuthToken(user)

    user = sterilizeUserModel(user.get())

    return res.status(201).json({ message: 'Login successful', user, auth_token  })
})