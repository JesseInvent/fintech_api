import { Router } from "express"
import signupController from '../../controllers/auth/signupController.js'
import loginController from '../../controllers/auth/loginController.js'

const router = Router()

// ** /api/v1/auth/
router.get('/', (req, res, next) => {
    return res.status(200).json({ message: "User Auth Routes" })
})

/**
 * Possible 2FA routes for user authentication
 */

// ** /api/v1/auth/signup
router.post('/signup', signupController)

router.post('/login', loginController)


export default router