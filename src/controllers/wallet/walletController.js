import User from "../../models/User.js"
import Wallet from "../../models/Wallet.js"
import AppError from "../../utils/AppError.js"
import asyncHandler from "../../utils/asyncHandler.js"
import { fundUserWallet, transferFundsToAnotherUser } from "../../utils/userWalletFunctions.js"



export const fundWallet = asyncHandler( async (req, res, next) => {

    /**
     * This is a temporary controller function, 
     * so no further authentication or verification 
     * will be done
     * 
    */  

    const result = await fundUserWallet({ email: req.body.email, amount: req.body.amount })

    if(result) return res.status(200).json()

})

export const transferFundsToUser = asyncHandler( async (req, res, next) => {

    const userWallet = await Wallet.findOne({ where: 
            { email: req.user.email } 
        })


    if(userWallet.amount < req.body.amount){
       next(
            new AppError({res, statusCode: 422, message: 'You do not have enough funds in your wallet '})
       )
    }

    const result = transferFundsToAnotherUser({
                        senderEmail: req.user.email, 
                        destinationEmail: req.body.destinationEmail,
                        amount: req.body.amount
                    })

    if (!result) {
        next(
            new AppError({res, statusCode: 500, message: 'We encountered an error, could not complete request'})
        )
    }

    // Send credit and debit emails to users

    return res.status(200).json({ status: 'success', message: 'Funds successfully transferred' })

})


export const withdrawFromWallet = asyncHandler( async (req, res, next) => {

    // check for beneficiaries

})