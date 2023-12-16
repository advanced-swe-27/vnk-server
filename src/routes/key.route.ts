import { Router } from 'express';
import { VerifyAccess,  VerifySudo } from '../middlewares';
import { createKey, getAllKeys, getKeyById, getKeyByRoom, updateKeyStatus } from '../controllers/key.controller';

//  /resident
const router = Router();

router.post("/", VerifyAccess, VerifySudo, createKey)

router.get("/", VerifyAccess, getAllKeys)
router.get("/:id", VerifyAccess, getKeyById)
router.get("/room/:id", VerifyAccess, getKeyByRoom)

router.patch("/:id", VerifyAccess, updateKeyStatus)


export default router;