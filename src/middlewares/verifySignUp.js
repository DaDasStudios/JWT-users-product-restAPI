import { ROLES } from '../models/Role'
import User from '../models/User'


export const checkRoleExisted = (req, res, next) => {
    if (req.body?.roles) {
        for (let index = 0; index < req.body.roles.length; index++) {
            if (!ROLES.includes(req.body.roles[index])){
                return res.status(400).json({
                    message: `Role ${req.body.roles[index]} does not exist`
                })
            }
        }
    }
    next()
}

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const duplicateUsername = await User.findOne({username: req.body.username})

    if (duplicateUsername) return res.status(400).json("User already exists")

    const duplicateEmail = await User.findOne({email: req.body.email})
    if (duplicateEmail) return res.status(400).json("Email already exists")

    next()
}