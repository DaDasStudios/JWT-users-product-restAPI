import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import { PORT } from './config'
import {createRoles} from './libs/initialSetup'

import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

const app = express()
createRoles()
app.set('port', PORT || 5000)
app.set('pkg', pkg)

// Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use("/api/products" ,productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

export default app