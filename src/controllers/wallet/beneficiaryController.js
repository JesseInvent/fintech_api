import User from "../../models/User.js";
import AppError from "../../utils/AppError.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const addBeneficiary = asyncHandler( async (req, res, next) => {

    if(!req.body.bank_name || !req.body.account_number || !req.body.sort_code) {
        next(
            new AppError({res, statusCode: 400, message: 'Please provide all required fields 🙂'})
        )
    }

    /**
     * Possible account number verification functionality
     * Possible 2FA or password verification
     */

   await User.update({...req.body}, {
        where: {
            id: req.user.id
        }
    })

    return res.status(202).json({ status: 'success', message: 'Beneficiary successfully added 🙂' });

})