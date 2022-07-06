import Product from '../models/Product'
const NOT_FOUND = "Not Found"

export async function createProduct(req, res) {
    const { name, category, price, imgUrl } = req.body

    if (!name || !category || !price || !imgUrl) return res.status(400).json("Invalid data")

    // Create product model
    const newProduct = new Product({ name, category, price, imgUrl })

    try {
        const product = await newProduct.save()
        return product ? res.status(201).json(product) : res.status(500)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function getProducts(req, res) {
    try {
        const products = await Product.find()
        return res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id)
        return product ? res.status(200).json(product) : res.status(404).json("Product Not Found")
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export async function updateProductById(req, res) {
    try {
        const {name, category, price, imgUrl} = req.body
        if (!name && !category && !price && !imgUrl) return res.status(400).json("Invalid data")

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body)
        return updatedProduct ? res.status(201).json(updatedProduct) : res.status(404).json(NOT_FOUND)

    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export async function deleteProductbyId(req, res) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        return deletedProduct ? res.sendStatus(204) : res.status(404).json(NOT_FOUND)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
