import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        if (!token) return res.status(403).json({ message: "No token provided" })

        const decoded = jwt.verify(token, TOKEN_SECRET)
        req.userId = decoded.id

        const userFound = await User.findById(decoded.id, { password: 0 })
        if (!userFound) return res.status(404).json({ message: "User not found" })

        console.log(userFound)

        next()
    } catch (error) {
        return res.status(401).json('Unauthorized')
    }
}

export const isModerator = async (req, res, next) => {
    const foundUser = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: foundUser.roles}})

    for (let index = 0; index < roles.length; index++) {
        if (roles[index].name === "moderator") {
            next()
            return
        }
    }
    return res.status(403).json({message: "Require Moderator role"})
}

export const isAdmin = async (req, res, next) => {
    const foundUser = await User.findById(req.userId)
    const roles = await Role.find({_id: {$in: foundUser.roles}})

    for (let index = 0; index < roles.length; index++) {
        if (roles[index].name === "admin") {
            next()
            return
        }
    }
    return res.status(403).json({message: "Require Admin role"})    
}