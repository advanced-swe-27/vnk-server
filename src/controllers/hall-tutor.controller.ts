import _ from "lodash"
import { __genPassword } from "../helpers/string";
import { UserModel } from "../models"
import { NextFunction, Request, Response } from 'express';
import { createError } from "../utils";
import { sendMail } from "./mailer";
import { CreateUserInput, ChangePasswordInput } from "../types";


export async function createHallTutor(req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) {
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
            role: "SUDO",
            password
        })

        await newUser.save()

        await sendMail({
            args: {
                email,
                template: "HallTutorCreated",
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