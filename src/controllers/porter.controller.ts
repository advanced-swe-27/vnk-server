import _ from "lodash"
import { __genPassword } from "../helpers/string";
import { UserModel } from "../models"
import { NextFunction, Request, Response } from 'express';
import { createError } from "../utils";
import { sendMail } from "./mailer";
import { CreateUserInput, User } from "../types";


export async function createPorter(req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) {
    const { email, othernames, phone,  surname } = req.body

    try {
        if (!email || !othernames || !surname || !phone ) {
            return next(createError(400, 'Provide all required fields'));
        }

        const userExists = await UserModel.findOne({ email })

        if (userExists) {
            return next(createError(409, 'User already exists with this email'));
        }

        const password = __genPassword(12);

        const newUser = new UserModel({
            othernames,
            surname,
            email,
            phone,
            role: "PORTER",
            password
        })

        await newUser.save()

        await sendMail({
            args: {
                email,
                template: "PorterCreated",
                data: {
                    password,
                    user: newUser,
                }
            }
        })

        // req.user = newUser

        res.status(201).json({
            success: true,
            data: newUser,
        });


    } catch (error) {
        next(error)
    }
}

export async function getAllPorters(req: Request, res: Response, next: NextFunction) {
    try {
        const rooms = await UserModel.find({role: "PORTER"})

        res.status(200).json({
            success: true,
            message: 'Rooms fetched successfully',
            data: rooms,
        });
    } catch (error) {
        next(error)
    }
}

export async function getPorterById(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const room = await UserModel.findById(id)

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

export async function deletePorter(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        if (!id) {
            return next(createError(400, 'Provide room id'));
        }

        const room = await UserModel.findById(id)

        if (!room) {
            return next(createError(404, "Room not found"))
        }

        const deletedRoom = await UserModel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'Room fetched successfully',
            data: deletedRoom,
        });
    } catch (error) {
        next(error)
    }
}