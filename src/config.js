import dotenv from 'dotenv'
dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI
export const MONGODB_USER = process.env.MONGODB_USER
export const MONGODB_PWD = process.env.MONGODB_PWD
export const PORT = process.env.PORT
export const TOKEN_SECRET = process.env.TOKEN_SECRET