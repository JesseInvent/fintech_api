import { Router } from "express"
import { addBeneficiary } from "../../controllers/wallet/beneficiaryController.js"
import { fundWallet, transferFundsToUser } from "../../controllers/wallet/walletController.js"
import verifyUserAuthToken from "../../middlewares/auth/verifyUserAuthToken.js"

const router = Router()

// ** /api/v1/wallet/
router.get('/', (req, res, next) => {
    return res.status(200).json({ message: "App wallet features routes" })
})

// ** /api/v1/wallet/add_beneficiary 
router.post('/add_beneficiary', verifyUserAuthToken, addBeneficiary)


// ** /api/v1/wallet/fund

/**
 * Please note this endpoint is for testing purposes and its temporary
 * 
 * Wallet funding ideally will be done through a payment gateway
 * and triggered with a webhook event
 * This endpoint somehow mimmicks a webhook event call
 */
router.post('/fund', fundWallet)


//** /api/v1/wallet/transfer
router.post('/transfer', verifyUserAuthToken, transferFundsToUser)


export default router