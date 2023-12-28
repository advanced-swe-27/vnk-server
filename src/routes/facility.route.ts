import { Router } from 'express';
import { VerifyAccess, VerifyAdmin, VerifyPorter, VerifySudo } from '../middlewares';
import { createFacility, deleteFacility, getAllFacilities, getFacilityById, updateFacility } from '../controllers/facility.controller';

//  /facility
const router = Router();

router.post("/", VerifyAccess, VerifySudo, createFacility)

router.get("/",VerifyAccess,  getAllFacilities)
router.get("/:id", VerifyAccess, getFacilityById)

router.put("/:id", VerifyAccess, VerifySudo, updateFacility)

router.delete("/:id", VerifyAccess, VerifySudo, deleteFacility)


export default router;