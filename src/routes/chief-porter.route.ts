import { Router } from 'express';
import { VerifyAccess, VerifyAdmin, VerifyChiefPorter, VerifySudo } from '../middlewares';
import { createChiefPorter } from '../controllers/chief-porter.controller';
import { updateUserPassword } from '../controllers/user.controller';

//  /porter
const router = Router();

router.post("/", VerifyAccess, VerifySudo, createChiefPorter)
router.post("/change-password", VerifyAccess, VerifyChiefPorter, updateUserPassword)



export default router;