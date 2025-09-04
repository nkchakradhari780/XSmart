import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import indexRoute from './routes/indexRoute.js'

dotenv.config();
import db from './config/dbConnection.js'

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: process.env.CORS_CREDENTIALS
}))

console.log('ENV:', process.env.NODE_ENV)

app.use('/', indexRoute)

const PORT = process.env.PORT
 
app.listen(PORT, () => {
    console.log(`Server Started on port: ${PORT}`)
}) 