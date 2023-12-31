import _ from "lodash"
import { __genPassword } from "../helpers/string";
import { UserModel } from "../models"
import { NextFunction, Request, Response } from 'express';
import { createError } from "../utils";
import { sendMail } from "./mailer";
import { CreateUserInput, ChangePasswordInput, User, UpdateUserDetailsInput } from "../types";

export async function updateUserPassword(req: Request<{}, {}, ChangePasswordInput>, res: Response, next: NextFunction) {
    const { oldPassword, newPassword } = req.body
    const { user: _user } = req

    try {
        const existingUser = await UserModel.findById(_user?.id)
        if (!existingUser) {
            return next(createError(404, "Account not found"))
        }

        const __isValid = await existingUser.comparePasswords(_.trim(oldPassword));

        if (!__isValid) {
            return next(createError(401, 'Invalid password!'));
        }

        if (existingUser?.meta?.isSuspended) {
            return next(createError(401, "Account has been suspended"))
        }

        existingUser.password = _.trim(newPassword);
        await existingUser.save();


        const __token = await existingUser.generateAuthToken()

        const updatedUser = await UserModel.findByIdAndUpdate(existingUser?._id, { token: __token }, { new: true })

        req.user = {
            isSuspended: updatedUser?.isSuspended,
            email: updatedUser?.email,
            id: updatedUser?._id,
            type: updatedUser?.role
        }

        res.status(200).json({
            success: true,
            message: 'Password change successful!',
            data: updatedUser,
        });

    } catch (error) {
        next(error)
    }
}


export async function updateUser(req: Request<{ }, {}, UpdateUserDetailsInput>, res: Response, next: NextFunction) {
    const { user: _user } = req
    const { surname, othernames, phone } = req.body
    try {
      

        if (!surname || !othernames || !phone) {
            return next(createError(400, 'Provide all required fields'));
            
        }

        const userExists = await UserModel.findById(_user?.id)

        if (!userExists) {
            return next(createError(404, "User not found"))
        }

        if (userExists?.meta?.isSuspended) {
            return next(createError(401, "Account has been suspended"))
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userExists?._id, {
            surname,
            othernames,
            phone,
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        next(error)
    }
}
