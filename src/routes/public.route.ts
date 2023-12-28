import { Router } from 'express';
import { VerifyAccess, VerifyAdmin, VerifyPorter, VerifySudo } from '../middlewares';
import { getAllCounts } from '../controllers/public.controller';

//  /public
const router = Router();


router.get("/", getAllCounts)


export default router;