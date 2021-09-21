import User from "../../models/User.js";
import AppError from "../../utils/AppError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import authenticateUserLoginDetails from "../../utils/auth/authenticateUserLoginDetails.js";
import { compareHash } from "../../utils/bcryptFunction.js"
import { createAuthToken } from "../../utils/jwtFunction.js";
import { sterilizeUserModel } from "../../utils/sterilizers.js"

export default asyncHandler(async (req, res, next) => {

    if (!req.body.email || !req.body.password) {
        next(
            new AppError({res, statusCode: 400, message: 'Please provide email and password 🙂'})
        )
    }

    // login
    const authenticateUser = await authenticateUserLoginDetails({  
        email: req.body.email,
        password: req.body.password
    })

    if(authenticateUser === false) {
        next(
            new AppError({res, statusCode: 400, message: 'Invalid login credentials 🙂'})
        )
    }

    let user  = authenticateUser

    // console.log(user);

    const auth_token = createAuthToken(user)

    user = sterilizeUserModel(user)

    return res.status(200).json({ message: 'Login successful', user, auth_token  })


})