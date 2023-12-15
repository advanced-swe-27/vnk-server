import { Router } from 'express';
import { VerifyAccess, VerifyAdmin, VerifyPorter, VerifySudo } from '../middlewares';
import { createPorter } from '../controllers/porter.controller';
import { updateUserPassword } from '../controllers/user.controller';

//  /porter
const router = Router();

router.post("/", VerifyAccess, VerifyAdmin, createPorter)
router.post("/change-password", VerifyAccess, VerifyPorter, updateUserPassword)


export default router;