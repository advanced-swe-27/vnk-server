import { Router } from 'express';
import { VerifyAccess, VerifyChiefPorter, VerifySudo } from '../middlewares';
import { createChiefPorter, deleteChiefPorter, getAllChiefPorters,getChiefPorterById } from '../controllers/chief-porter.controller';
import { updateUserPassword } from '../controllers/user.controller';

//  /porter
const router = Router();

router.post("/", VerifyAccess, VerifySudo, createChiefPorter)
router.post("/change-password", VerifyAccess, VerifyChiefPorter, updateUserPassword)

router.get("/", VerifyAccess, VerifySudo,  getAllChiefPorters)
router.get("/:id", VerifyAccess, VerifySudo, getChiefPorterById)

router.delete("/:id", VerifyAccess, VerifySudo,  deleteChiefPorter)


export default router;