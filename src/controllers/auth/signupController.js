import AppError from '../../utils/AppError.js'
import asyncHandler from '../../utils/asyncHandler.js'
import User from '../../models/User.js'


export default asyncHandler( async (req, res, next) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        next(
           new AppError(res, 400, "You missed a required field, please check fields submitted 🙂")
        )
    }

    if (req.body.password !== req.body.confirm_password) {
        next(
            new AppError(res, 400, "Passwords do not 😔")
         )
    }

    if (req.body.password.length < 7) {
        next(
            new AppError(res, 400, "Passwords too short, must not be less 6 digits 🙂")
        )
    }

    const user = await User.create({...req.body})
    // console.log(user);

    return res.status(201).json({ message: 'Signup successful', user })
})