import User from "../../models/User.js"
import Wallet from "../../models/Wallet.js"
import AppError from "../../utils/AppError.js"
import asyncHandler from "../../utils/asyncHandler.js"
import authenticateUserLoginDetails from "../../utils/auth/authenticateUserLoginDetails.js"
import depositToBank from "../../utils/wallet/depositToBank.js"
import { debitUserWallet, fundUserWallet, transferFundsToAnotherUser } from "../../utils/wallet/userWalletFunctions.js"


export const fundWallet = asyncHandler( async (req, res, next) => {

    /**
     * This is a temporary controller function, 
     * so no further authentication or verification 
     * will be done
     * 
     * Funding user wallet will be trigerred by
     * a webhook event from a payment gateway
     * 
    */  

    const result = await fundUserWallet({ email: req.body.email, amount: req.body.amount })

    if(result) return res.status(200).json()

})

export const transferFundsToUser = asyncHandler( async (req, res, next) => {

    if(!req.body.destinationEmail || !req.body.amount) {
        next(
            new AppError({res, statusCode: 400, message: 'You missed a required field 😕'})
        )
    }

    const userWallet = await Wallet.findOne({ where: 
            { email: req.user.email } 
        })


    if(userWallet.amount < req.body.amount){
       next(
            new AppError({res, statusCode: 422, message: 'You do not have enough funds in your wallet 🙂'})
       )
    }

    const result = transferFundsToAnotherUser({
                        senderEmail: req.user.email, 
                        destinationEmail: req.body.destinationEmail,
                        amount: req.body.amount
                    })

    if (!result) {
        next(
            new AppError({res, statusCode: 500, message: 'We encountered an error, could not complete request 😔'})
        )
    }

    // Send credit and debit emails to users

    return res.status(200).json({ status: 'success', message: 'Funds successfully transferred 🙂' })

})


export const withdrawFromUserWallet = asyncHandler( async (req, res, next) => {

    if(!req.body.amount || !req.body.account_password) {
        next(
            new AppError({res, statusCode: 400, message: 'You missed a required field 😕'})
        )
    }

    /**
     * Possible password verification functionality
     *  or 2FA authentication with a phone number and token
     */

    const user = await authenticateUserLoginDetails({ email: req.user.email, password: req.body.account_password })

    if(user === false) {
        next(
            new AppError({res, statusCode: 401, message: 'Could not authenicate your account 😕'})
        ) 
    }


    if(user.bank_name === null || user.account_number === null ) {
        next(
            new AppError({res, statusCode: 422, message: 'You have not added a beneficiary, please add beneficiary before requesting for withdrawal 🙂'})
        ) 
    }


    /**
     * Use payment gateway to transfer funds to user account
     * After success send email to user
     */

    const depositResult = await depositToBank({
                                accountNumber: user.account_number,
                                bankName: user.bank_name,
                                sortCode: user.sort_code
                            })

    if(depositResult) {

      await debitUserWallet({email: req.user.email, amount: req.body.amount})

      // Send withdrawal email to user.email

      res.status(200).json({ status: 'success', message: 'Withdrawal successfully made' })

    }

    return res.status(500).json({ status: 'fail', message: 'Withdrawal request could not be processed, please try again later 🙂' })

})