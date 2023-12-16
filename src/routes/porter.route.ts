import { Router } from 'express';
import { VerifyAccess, VerifyAdmin, VerifyPorter, VerifySudo } from '../middlewares';
import { createPorter, deletePorter, getAllPorters, getPorterById } from '../controllers/porter.controller';
import { updateUserPassword } from '../controllers/user.controller';

//  /porter
const router = Router();

router.post("/", VerifyAccess, VerifyAdmin, createPorter)
router.post("/change-password", VerifyAccess, VerifyPorter, updateUserPassword)

router.get("/", VerifyAccess, VerifyAdmin,  getAllPorters)
router.get("/:id", VerifyAccess, VerifyAdmin, getPorterById)

router.delete("/:id", VerifyAccess, VerifyAdmin,  deletePorter)


export default router;