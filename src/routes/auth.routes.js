import { Router } from 'express'
const router = Router()
import { signIn, signUp } from '../controllers/auth.controller'
import { checkDuplicateUsernameOrEmail } from '../middlewares/'

router.post("/signin", signIn)
router.post("/signup", checkDuplicateUsernameOrEmail ,signUp)

export default router