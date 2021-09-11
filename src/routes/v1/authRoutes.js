import { Router } from "express"
import signupController from '../../controllers/auth/signupController.js'

const router = Router()

// ** /api/v1/auth/
router.get('/', (req, res, next) => {
    return res.status(200).json({ message: "User Auth Routes" })
})

// ** /api/v1/auth/signup
router.post('/signup', signupController)







export default router