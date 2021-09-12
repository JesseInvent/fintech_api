import User from "../../models/User.js";
import asyncHandler from "../../utils/asyncHandler.js";

export const addBeneficiary = asyncHandler( async (req, res, next) => {

    console.log(req.body);
   await User.update({...req.body}, {
        where: {
            id: req.userId
        }
    })

    // const user = await User.findByPk(req.userId)

    return res.status(202).json({ message: 'Beneficiary successfully added' });

})