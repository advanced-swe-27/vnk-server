import _ from "lodash"
import { __genPassword } from "../helpers/string";
import { UserModel, RoomModel , KeyModel } from "../models"
import { NextFunction, Request, Response } from 'express';
import { createError } from "../utils";
import {  Key } from "../types";

export async function createKey(req: Request<{}, {}, Key>, res: Response, next: NextFunction) {
    const { room} = req.body

    try {
        if (!room) {
            return next(createError(400, 'Provide all required fields'));
        } 
        
        const keyExists = await KeyModel.findOne({ room })
        console.log(keyExists)
        if (keyExists) {
            return next(createError(409, 'A main key exists for this room already'));
        }


        const newKey = new KeyModel({
            room
        })

        await newKey.save()

        res.status(201).json({
            success: true,
            data: newKey,
        });

    } catch (error) {
        next(error)
    }

}

export async function getAllKeys(req: Request, res: Response, next: NextFunction) {
    try {
        const keys = await KeyModel.find().populate("room")

        res.status(200).json({
            success: true,
            message: 'Keys fetched successfully',
            data: keys,
        });
    } catch (error) {
        next(error)
    }
}

export async function getKeyById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const room = await KeyModel.findById(id).populate("room")

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

export async function getKeyByRoom(req: Request<{ room: string }>, res: Response, next: NextFunction) {
    const { room } = req.params
    try {
        if (!room) {
            return next(createError(400, 'Provide room id'));
        }

        const key = await KeyModel.findOne({room}).populate("room")

        if (!key) {
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

export async function updateKeyStatus(req: Request<{ id: string }, {}, Pick<Key, "status">>, res: Response, next: NextFunction) {
    const { id } = req.params
    const { status} = req.body
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const room = await KeyModel.findById(id).populate("room")

        if (!room) {
            return next(createError(404, "Room not found"))
        }

        const deletedRoom = await KeyModel.findByIdAndUpdate(id, {
            status
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

