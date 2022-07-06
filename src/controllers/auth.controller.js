import User from '../models/User'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
import Role from '../models/Role'

export async function signIn(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json('Invalid data')

        const userFound = await User.findOne({ email: email }).populate("roles")

        if (!userFound) return res.status(400).json("User not found")

        // Compare password
        const matchPwd = await User.comparePwd(password, userFound.password)

        if (!matchPwd) return res.status(401).json({ token: null, message: "Invalid password" })

        const token = jwt.sign({ id: userFound._id }, TOKEN_SECRET, {
            expiresIn: 86400
        })

        //console.log(userFound)
        return res.json({ token })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export async function signUp(req, res) {
    try {
        const { username, email, password, roles } = req.body
        if (!username || !email || !password) return res.status(400).json("Invalid data")

        // Create it
        const newUser = new User({
            username, email,
            password: await User.encryptPwd(password)
        })

        if (newUser) {
            // Validate roles
            if (roles) {
                const foundRoles = await Role.find({ name: { $in: roles } })
                newUser.roles = foundRoles.map(role => role._id)
            } else {
                const role = await Role.findOne({ name: "user" })
                newUser.roles = [role._id]
            }

            const savedUser = await newUser.save()
            const token = jwt.sign({ id: savedUser._id }, TOKEN_SECRET, {
                expiresIn: "86400" // 24 hours
            })
            //console.log(savedUser)
            return res.status(201).json({ token })
        }


    } catch (error) {
        return res.status(500).json(error.message)
    }
}