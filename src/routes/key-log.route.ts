import { Router } from 'express';
import { VerifyAccess } from '../middlewares';
import { closeKeyLog, createKeyLog, deleteKeyLog, getAllKeyLogs, getKeyLogById, getKeyLogByRoom } from '../controllers/key-log.controller';

//  /key-log
const router = Router();

router.post("/", VerifyAccess, createKeyLog )
router.patch("/:id", VerifyAccess, closeKeyLog )
router.get("/", VerifyAccess, getAllKeyLogs )
router.get("/:id", VerifyAccess, getKeyLogById )
router.get("/room/:id", VerifyAccess, getKeyLogByRoom )
router.delete("/:id", VerifyAccess, deleteKeyLog )


export default router;