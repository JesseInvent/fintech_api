import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const addBeneficiary = asyncHandler( async (req, res, next) => {

   await User.update({...req.body}, {
        where: {
            id: req.user.id
        }
    })

    // const user = await User.findByPk(req.userId)

    return res.status(202).json({ message: 'Beneficiary successfully added' });

})