import AppError from '../../utils/AppError.js'
import asyncHandler from '../../utils/asyncHandler.js'
import User from '../../models/User.js'
import { createAuthToken } from '../../utils/jwtFunction.js'
import { sterilizeUserModel, sterilizeWalletModel } from "../../utils/sterilizers.js"
import { createUserWallet } from "../../utils/wallet/userWalletFunctions.js"

export default asyncHandler( async (req, res, next) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        next(
           new AppError({ res, statusCode: 400, message: "You missed a required field, please check fields submitted 🙂"})
        )
    }

    if (req.body.password !== req.body.confirm_password) {
        next(
            new AppError({ res, statusCode: 400, message: "Passwords do not 😔"})
         )
    }

    if (req.body.password.length < 7) {
        next(
            new AppError({ res, statusCode: 400, message: "Passwords too short, must not be less 6 digits 🙂"})
        )
    }

    let checkUser = await User.findOne({
            where: { email: req.body.email }
        })

    if (checkUser) {
        next(
            new AppError({ res, statusCode: 400, message: "A user will this account alread exists 🙂"})
        )
    }

    let user = await User.create({...req.body})

    let wallet = await createUserWallet(user.email)

    const auth_token = createAuthToken(user)

    user = sterilizeUserModel(user.get())
    wallet = sterilizeWalletModel(wallet.get())

    // Send successful signup email

    return res.status(201).json({ message: 'Signup successful', user, wallet, auth_token  })
    
})