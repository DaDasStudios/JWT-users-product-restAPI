import { Router } from 'express'
import { createUser } from '../controllers/user.controller'
import { isModerator, verifyToken } from '../middlewares/authJwt'
import { checkDuplicateUsernameOrEmail, checkRoleExisted } from '../middlewares/verifySignUp'
const router = Router()

router.post('/', [verifyToken, isModerator, checkRoleExisted, checkDuplicateUsernameOrEmail],createUser)

export default router