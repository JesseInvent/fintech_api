import express, { json } from "express"
import connect from "./DB/connect.js"
import dotenv from "dotenv"
dotenv.config()

await connect()

const app = express()

export default app