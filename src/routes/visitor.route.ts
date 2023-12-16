import { Router } from 'express';
import { VerifyAccess, VerifyAdmin, VerifyPorter, VerifySudo } from '../middlewares';
import { createVisitor, deleteVisitor, getAllVisitors, getVisitorById, updateVisitor, flagVisitor, unflagVisitor } from '../controllers/visitor.controller';

//  /visitor
const router = Router();

router.post("/", VerifyAccess, createVisitor)
router.get("/", VerifyAccess, getAllVisitors)
router.get("/:id", VerifyAccess, getVisitorById)

router.put("/:id", VerifyAccess, updateVisitor)

router.patch("/flag/:id", VerifyAccess, flagVisitor)
router.patch("/unflag/:id", VerifyAccess, unflagVisitor)

router.delete("/:id", VerifyAccess, deleteVisitor)


export default router;