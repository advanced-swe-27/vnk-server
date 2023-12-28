import { Router } from 'express';
import { VerifyAccess } from '../middlewares';
import { closeVisitLog, createVisitLog, deleteVisitLog, getAllVisitLogs, getVisitLogById, getVisitLogByRoom } from '../controllers/visit-log.controller';

// /visit-log
const router = Router();

router.post("/", VerifyAccess, createVisitLog);
router.patch("/:id", VerifyAccess, closeVisitLog);
router.get("/", VerifyAccess, getAllVisitLogs);
router.get("/:id", VerifyAccess, getVisitLogById);
router.get("/room/:id", VerifyAccess, getVisitLogByRoom);
router.delete("/:id", VerifyAccess, deleteVisitLog);

export default router;
