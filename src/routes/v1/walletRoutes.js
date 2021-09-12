import { Router } from "express"
import {addBeneficiary} from "../../controllers/wallet/beneficiaryController.js"
import verifyUserAuthToken from "../../middlewares/auth/verifyUserAuthToken.js"

const router = Router()

// ** /api/v1/wallet/
router.post('/', (req, res, next) => {
    return res.status(200).json({ message: "App features Routes" })
})

// ** /api/v1/wallet/add_beneficiary 
router.post('/add_beneficiary', verifyUserAuthToken, addBeneficiary)

export default router