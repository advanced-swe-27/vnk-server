import _ from "lodash"
import {  RoomModel, KeyModel, ResidentModel } from "../models"
import { NextFunction, Request, Response } from 'express';
import { createError } from "../utils";
import { Room } from "../types";

export async function createRoom(req: Request<{}, {}, Room>, res: Response, next: NextFunction) {
    const { capacity, gender, num } = req.body

    try {
        if (!gender || !num) {
            return next(createError(400, 'Provide all required fields'));
        } 
        
        const roomExists = await RoomModel.findOne({ num })
        console.log(roomExists)
        if (roomExists) {
            return next(createError(409, 'Room Exists'));
        }

        const newRoom = new RoomModel({
            capacity: capacity || 4,
            gender,
            num,
        })

        await newRoom.save()

        const roomKey = new KeyModel({
            room: newRoom?._id
        })

        await roomKey.save()

        res.status(201).json({
            success: true,
            data: newRoom,
        });

    } catch (error) {
        next(error)
    }

}

export async function getAllRooms(req: Request, res: Response, next: NextFunction) {
    try {
        const rooms = await RoomModel.find()

        res.status(200).json({
            success: true,
            message: 'Rooms fetched successfully',
            data: rooms,
        });
    } catch (error) {
        next(error)
    }
}

export async function getRoomById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const room = await RoomModel.findById(id)

        if (!room) {
            return next(createError(404, "Room not found"))
        }

        res.status(200).json({
            success: true,
            message: 'Room fetched successfully',
            data: room,
        });
    } catch (error) {
        next(error)
    }
}

export async function updateRoom(req: Request<{ id: string }, {}, Room>, res: Response, next: NextFunction) {
    const { id } = req.params
    const { capacity, gender, num} = req.body
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const room = await RoomModel.findById(id)

        if (!room) {
            return next(createError(404, "Room not found"))
        }

        const deletedRoom = await RoomModel.findByIdAndUpdate(id, {
            gender,
            num,
            capacity,
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: 'Room update successfully',
            data: deletedRoom,
        });
    } catch (error) {
        next(error)
    }
}



export async function deleteRoom(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const room = await RoomModel.findById(id)

        if (!room) {
            return next(createError(404, "Room not found"))
        }

         // check if room has residents
        const roommates = await ResidentModel.find({ room })
        
        if (roommates?.length > 0) {
            return next(createError(409, "There are residents in this room"))
        }

        const deletedRoom = await RoomModel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'Room deleted successfully',
            data: deletedRoom,
        });
    } catch (error) {
        next(error)
    }
}