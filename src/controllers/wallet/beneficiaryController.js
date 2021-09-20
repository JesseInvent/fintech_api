import User from "../../models/User.js";
import AppError from "../../utils/AppError.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const addBeneficiary = asyncHandler( async (req, res, next) => {

    if(!req.body.bank_name || !req.body.account_number || !req.body.sort_code) {
        next(
            new AppError({res, statusCode: 400, message: 'Please provide all required fields'})
        )
    }

    /**
     * Possible account number verification functionality
     */

   await User.update({...req.body}, {
        where: {
            id: req.user.id
        }
    })

    // const user = await User.findByPk(req.userId)

    return res.status(202).json({ message: 'Beneficiary successfully added' });

})