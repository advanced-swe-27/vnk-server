import _ from "lodash"
import { RoomModel, KeyModel, ResidentModel, KeyLogModel } from "../models"
import { NextFunction, Request, Response } from 'express';
import { createError } from "../utils";
import { Room, KeyLog } from "../types";

type OpenKeyLogInput = {
    openedBy: string,
    room: string
}

type CloseKeyLogInput = {
    closedBy: string
}

export async function createKeyLog(req: Request<{}, {}, OpenKeyLogInput>, res: Response, next: NextFunction) {
    const { openedBy, room } = req.body

    try {
        if (!openedBy || !room) {
            return next(createError(400, 'Provide all required fields'));
        }

        const roomExists = await RoomModel.findById(room)

        if (!roomExists) {
            return next(createError(404, 'Room does not exist'));
        }

        const residentExists = await ResidentModel.findById(openedBy).populate("room")
        if (!residentExists) {
            return next(createError(404, 'Resident does not exist'));
        }

        // check if resident is a member of room
        if (residentExists.room._id.toString() !== room) {
            return next(createError(403, 'Resident is not a member of the room'));
        }

        // check if room is already open
        const existingOpenKeyLog = await KeyLogModel.findOne({ room, closedAt: null });
        if (existingOpenKeyLog) {
            return next(createError(400, 'The room is already open.'));
        }

        // check that the same resident is not trying to open the room multiple times
        const existingResidentKeyLog = await KeyLogModel.findOne({ room, openedBy, closedAt: null });
        if (existingResidentKeyLog) {
            return next(createError(400, 'The resident has already opened this room.'));
        }

        const newKeyLog = new KeyLogModel({
            room,
            openedBy,
        })

        await newKeyLog.save()

        const createdKeyLog = await KeyLogModel.findById(newKeyLog._id).populate("openedBy room")


        res.status(201).json({
            success: true,
            data: createdKeyLog,
        });

    } catch (error) {
        next(error)
    }

}

export async function closeKeyLog(req: Request<{ id: string }, {}, CloseKeyLogInput>, res: Response, next: NextFunction) {
    const { closedBy } = req.body
    const { id } = req.params

    try {
        if (!closedBy || !id) {
            return next(createError(400, 'Provide all required fields'));
        }

        const keyLogExists = await KeyLogModel.findById(id)

        if (!keyLogExists) {
            return next(createError(404, 'Key Log does not exist'));
        }

        const residentExists = await ResidentModel.findById(closedBy).populate("room")
        if (!residentExists) {
            return next(createError(404, 'Resident does not exist'));
        }

         // check if resident is a member of room
         if (keyLogExists.room.toString() !== residentExists.room._id.toString()) {
            return next(createError(403, 'Key Log does not belong to the claimed room.'));
        }

        // check if key log is already closed
        if (keyLogExists.closedAt) {
            return next(createError(400, 'Key Log is already closed.'));
        }


        const updatedKeyLog = await KeyLogModel.findByIdAndUpdate(id, {
            closedBy,
            closedAt: new Date()
        }, { new: true }).populate("openedBy room closedBy")

        res.status(200).json({
            success: true,
            data: updatedKeyLog,
        });

    } catch (error) {
        next(error)
    }

}

export async function getAllKeyLogs(req: Request, res: Response, next: NextFunction) {
    try {
        const keyLogs = await KeyLogModel.find().populate("openedBy room closedBy")

        res.status(200).json({
            success: true,
            message: 'Key Logs fetched successfully',
            data: keyLogs,
        });
    } catch (error) {
        next(error)
    }
}

export async function getKeyLogById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide key log id'));
        }

        const keyLog = await KeyLogModel.findById(id).populate("openedBy room closedBy")

        if (!keyLog) {
            return next(createError(404, "Key log not found"))
        }

        res.status(200).json({
            success: true,
            message: 'Key Log fetched successfully',
            data: keyLog,
        });
    } catch (error) {
        next(error)
    }
}

export async function deleteKeyLog(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide key log id'));
        }

        const keyLog = await KeyLogModel.findById(id).populate("openedBy room closedBy")

        if (!keyLog) {
            return next(createError(404, "Key log not found"))
        }

        const deletedKeyLog = await KeyLogModel.findByIdAndDelete(id).populate("openedBy room closedBy")

        res.status(200).json({
            success: true,
            message: 'Key Log deleted successfully',
            data: deletedKeyLog,
        });
    } catch (error) {
        next(error)
    }
}


export async function getKeyLogByRoom(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const room = await RoomModel.findById(id)

        if (!room) {
            return next(createError(404, "Room not found"))
        }

        const keyLogs = await KeyLogModel.find({ room }).populate("openedBy room closedBy")

        res.status(200).json({
            success: true,
            message: 'Key Logs fetched successfully',
            data: keyLogs,
        });
    } catch (error) {
        next(error)
    }
}