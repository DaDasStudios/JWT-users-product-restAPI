import mongoose from 'mongoose'
import { MONGODB_PWD, MONGODB_USER, MONGODB_URI } from './config'

function connectDB() {
    mongoose.connect(MONGODB_URI, {
        user: MONGODB_USER,
        pass: MONGODB_PWD,
        dbName: "jwt-products"
    })
        .then(db => console.log(`DB connected in <${db.connections[0].name}>`))
        .catch(err => console.log(err))
}

export default connectDB 