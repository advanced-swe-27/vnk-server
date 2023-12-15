import { Router } from 'express';
import { loginUser, resetUserPassword, sendUserCode, verifyUserCode } from '../controllers/auth.controller';

//  /auth
const router = Router();

router.post("/login", loginUser)
router.post("/reset-password", resetUserPassword)
router.post("/send-code", sendUserCode)
router.post("/verify-code", verifyUserCode)



export default router;