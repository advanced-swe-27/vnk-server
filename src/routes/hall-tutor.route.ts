import { Router } from 'express';
import { VerifyAccess, VerifyAdmin, VerifySudo } from '../middlewares';
import { createHallTutor } from '../controllers/hall-tutor.controller';
import { updateUserPassword } from '../controllers/user.controller';

//  /hall-tutor
const router = Router();

router.post("/", VerifyAccess, VerifySudo, createHallTutor)
router.post("/change-password", VerifyAccess, VerifySudo, updateUserPassword)


export default router;