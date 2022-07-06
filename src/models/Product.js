import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    imgUrl: String
}, {
    timestamps: true,
    versionKey: false
})

export default mongoose.model('Product', productSchema)