import { Router } from "express"
import initializePayment from "../../controllers/payment/initializePayment.js"
import verifyUserAuthToken from '../../middlewares/auth/verifyUserAuthToken.js';

const router = Router()

// ** /api/v1/payment/
router.get('/', (req, res, next) => {
    return res.status(200).json({ message: "App payment routes" })
})

// ** /api/v1/payment/initialize 
router.get('/initialize', verifyUserAuthToken, initializePayment)

// ** /api/v1/wallet/fun
export default router