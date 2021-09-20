import express, { json } from "express"
import connect from "./DB/connect.js"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import xss from "xss-clean"
import helmet from "helmet"
import authRoutes from "./routes/v1/authRoutes.js"
import walletRoutes from "./routes/v1/walletRoutes.js"
import paymentRoutes from "./routes/v1/paymentRoutes.js"
import AppError from "./utils/AppError.js"

dotenv.config()

// await connect()

const app = express()

// Body Parser
app.use(express.json())

// CORS middleware
app.use(cors())

// Sanitizing user inputs
app.use(xss())

// Security headers
app.use(helmet())

if (process.env.NODE_ENV !== 'production') app.use(morgan("combined"))

app.get('/api/v1', (req, res, next) => {
    return res.status(200).send()
})

// app.post('/api/v1/wallet/add_beneficiary', (req, res, next) => {
//     return res.status(200).send()
// })

app.use('/api/v1/auth', authRoutes)

app.use('/api/v1/wallet', walletRoutes)

app.use('/api/v1/payment', paymentRoutes)

app.use('*', (req, res, next) => {
    next(
        new AppError({res, statusCode: 404, message: 'Invalid Route 🙂'})
    )
})

export default app