import { Router } from "express"

const router = Router()

// ** /api/v1/payment/
router.get('/', (req, res, next) => {
    return res.status(200).json({ message: "App payment routes" })
})

// ** /api/v1/payment/initialize 
router.get('/initialize')

// ** /api/v1/wallet/fun
export default router