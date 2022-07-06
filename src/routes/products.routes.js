import { Router } from 'express'
const router = Router()
import * as productsCtrl from '../controllers/products.controller'
import { verifyToken, isAdmin, isModerator} from '../middlewares'

router.route('/')
    .get(productsCtrl.getProducts)
    .post([verifyToken, isModerator], productsCtrl.createProduct)

router.route('/:id')
    .get(productsCtrl.getProductById)
    .put([verifyToken, isAdmin], productsCtrl.updateProductById)
    .delete([verifyToken, isAdmin], productsCtrl.deleteProductbyId)

export default router