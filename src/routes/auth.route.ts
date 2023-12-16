import { Router } from 'express';
import { loginUser, resetUserPassword, sendUserCode, verifyUserCode,  } from '../controllers/auth.controller';
import { updateUserPassword } from '../controllers/user.controller';
import { VerifyAccess } from '../middlewares';

//  /auth
const router = Router();

router.post("/login", loginUser)
router.post("/reset-password", resetUserPassword)
router.post("/send-code", sendUserCode)
router.post("/verify-code", verifyUserCode)
router.post("/change-password", VerifyAccess, updateUserPassword)


export default router;