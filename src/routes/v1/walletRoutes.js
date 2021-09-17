import { Router } from "express"
import { addBeneficiary } from "../../controllers/wallet/beneficiaryController.js"
import { fundWallet } from "../../controllers/wallet/walletController.js"
import verifyUserAuthToken from "../../middlewares/auth/verifyUserAuthToken.js"
import { verifyAndDecodeAuthToken } from "../../utils/jwtFunction.js"

const router = Router()

// ** /api/v1/wallet/
router.get('/', (req, res, next) => {
    return res.status(200).json({ message: "App wallet features routes" })
})

// ** /api/v1/wallet/add_beneficiary 
router.post('/add_beneficiary', verifyUserAuthToken, addBeneficiary)

// ** /api/v1/wallet/fund
// router.post('/fund', verifyAndDecodeAuthToken, fundWallet)

export default router