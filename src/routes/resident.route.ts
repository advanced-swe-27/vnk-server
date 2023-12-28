import { Router } from 'express';
import { VerifyAccess, VerifyAdmin, VerifyPorter, VerifySudo } from '../middlewares';
import { createResident, deleteResident, getAllResidents, getResidentById, getResidentByRoom, approveResident, rejectResident, changeResidentRoom, getAcceptedResidents} from '../controllers/resident.controller';

//  /resident
const router = Router();

router.post("/", createResident)

router.get("/", VerifyAccess, getAllResidents)
router.get("/accepted", VerifyAccess, getAcceptedResidents)
router.get("/:id", VerifyAccess, getResidentById)
router.get("/room/:id", VerifyAccess, getResidentByRoom)

router.patch("/approve/:id", VerifyAccess, VerifySudo, approveResident)
router.patch("/reject/:id", VerifyAccess, VerifySudo, rejectResident)
router.patch("/change-room/:id", VerifyAccess, VerifySudo, changeResidentRoom)

router.delete("/:id", VerifyAccess, VerifySudo, deleteResident )


export default router;