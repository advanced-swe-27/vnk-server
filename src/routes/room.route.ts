import { Router } from 'express';
import { VerifyAccess, VerifyAdmin, VerifyPorter, VerifySudo } from '../middlewares';
import { createRoom, deleteRoom, getAllRooms, getRoomById, updateRoom } from '../controllers/room.controller';

//  /room
const router = Router();

router.post("/", VerifyAccess, VerifySudo, createRoom)

router.get("/", VerifyAccess, getAllRooms)
router.get("/:id", VerifyAccess, getRoomById)

router.put("/:id", VerifyAccess, VerifySudo, updateRoom)

router.delete("/:id", VerifyAccess, VerifySudo, deleteRoom)


export default router;