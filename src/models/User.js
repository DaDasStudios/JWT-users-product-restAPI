import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPwd = async (pwd) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(pwd, salt)
}

userSchema.statics.comparePwd = async (pwd, receivedPwd) => {
    return await bcrypt.compare(pwd, receivedPwd)
}

export default model('User', userSchema)