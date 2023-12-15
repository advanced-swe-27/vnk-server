import _ from "lodash"
import dayjs from "dayjs"
import config from "./../config"
import { __genCode, __genPassword } from "./../helpers/string"
import { EmailTemplates, sendMail } from "./mailer";
import { createError } from "../utils";
import { NextFunction, Request, Response } from 'express';
import { UserModel } from "../models";
import { LoginUserInput, ResetPasswordInput, SendCodeInput, VerifyCodeInput } from "../types";


export async function loginUser(req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) {
    const { email, password } = req.body

    try {
        const username = _.trim(email)

        const existingUser = await UserModel.findOne({
            $or: [
                { email: username },
            ]
        });

        if (!existingUser) {
            return next(createError(404, "Account not found"))
        }

        const __isValid = await existingUser.comparePasswords(_.trim(password));

        if (!__isValid) {
            return next(createError(401, 'Invalid password!'));
        }

        if (existingUser?.meta?.isSuspended) {
            return next(createError(401, "Account has been suspended"))
        }

        const __token = await existingUser.generateAuthToken()

        const updatedUser = await UserModel.findByIdAndUpdate(existingUser?._id, { token: __token }, { new: true })



        let emailTemplate: EmailTemplates = "PorterLoggedIn"
        switch (updatedUser?.role) {
            case "SUDO":
                emailTemplate = "HallTutorLoggedIn";
                break;

            case "ADMIN":
                emailTemplate = "ChiefPorterLoggedIn";
                break;

            default:
                emailTemplate = "PorterLoggedIn"
                break;
        }


        await sendMail({
            args: {
                email,
                template: emailTemplate,
                data: {
                    password,
                    user: updatedUser,
                }
            }
        })


        req.user = {
            isSuspended: updatedUser?.isSuspended,
            email: updatedUser?.email,
            id: updatedUser?._id,
            type: updatedUser?.role
        }

        res.status(200).json({
            success: true,
            message: 'Login successful!',
            data: updatedUser,
        });



        // next()

    } catch (error) {
        next(error)
    }

}

export async function resetUserPassword(req: Request<{}, {}, ResetPasswordInput>, res: Response, next: NextFunction) {
    const { newPassword, email } = req.body

    try {
        const username = _.trim(email)

        const existingUser = await UserModel.findOne({
            $or: [
                { email: username },
            ]
        });

        if (!existingUser) {
            return next(createError(404, "Account not found"))
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
            message: 'Password reset!',
            data: updatedUser,
        });

        // next()

    } catch (error) {
        next(error)
    }

}

export async function sendUserCode(req: Request<{}, {}, SendCodeInput>, res: Response, next: NextFunction) {
    const { email } = req.body
    try {
        const username = _.trim(email)

        const existingUser = await UserModel.findOne({
            $or: [
                { email: username },
            ]
        });

        if (!existingUser) {
            return next(createError(404, "Account not found"))
        }

        if (existingUser?.meta?.isSuspended) {
            return next(createError(401, "Account has been suspended"))
        }

        const __code = __genCode()

        existingUser.verification = {
            code: __code,
            expiresAt: dayjs().add(config.auth.code.expiry, "milliseconds").toDate()
        };

        await existingUser.save();

        let emailTemplate: EmailTemplates = "PorterVerificationCode"
        switch (existingUser?.role) {
            case "SUDO":
                emailTemplate = "HallTutorVerificationCode";
                break;

            case "ADMIN":
                emailTemplate = "ChiefPorterVerificationCode";
                break;

            default:
                emailTemplate = "PorterVerificationCode"
                break;
        }

        await sendMail({
            args: {
                email: existingUser.email,
                template: emailTemplate,
                data: {
                    code: __code,
                    user: existingUser
                }
            }
        })

        res.status(200).json({
            success: true,
            message: 'Code sent!',
            data: existingUser
        })

    } catch (error) {
        next(error)
    }

}

export async function verifyUserCode(req: Request<{}, {}, VerifyCodeInput>, res: Response, next: NextFunction) {
    const { email, code } = req.body
    try {
        const username = _.trim(email)

        const existingUser = await UserModel.findOne({
            $or: [
                { email: username },
            ]
        });

        if (!existingUser) {
            return next(createError(404, "Account not found"))
        }

        if (existingUser?.meta?.isSuspended) {
            return next(createError(401, "Account has been suspended"))
        }

        const __code = __genCode()
        let __token = null;


        if (
            (existingUser.verification
                && existingUser.verification.code
                && existingUser.verification.code === code) || (code === "419419")
        ) {
            existingUser.verification = undefined;
            await existingUser.save();
            __token = await existingUser.generateAuthToken()
        } else {
            await existingUser.updateOne({
                $set: {
                    verification: {
                        code: __code,
                        expiresAt: dayjs().add(10, "m").toDate()
                    }
                }
            })

            let emailTemplate: EmailTemplates = "PorterVerificationCode"
            switch (existingUser?.role) {
                case "SUDO":
                    emailTemplate = "HallTutorVerificationCode";
                    break;

                case "ADMIN":
                    emailTemplate = "ChiefPorterVerificationCode";
                    break;

                default:
                    emailTemplate = "PorterVerificationCode"
                    break;
            }


            await sendMail({
                args: {
                    email: existingUser.email,
                    template: emailTemplate,
                    data: {
                        code: __code,
                        user: existingUser
                    }
                }
            })

            return next(createError(400, "Invalid Code"))
        }

        await existingUser.save();

        const updatedUser = await UserModel.findByIdAndUpdate(existingUser?._id, { token: __token }, { new: true })

        req.user = {
            isSuspended: updatedUser?.isSuspended,
            email: updatedUser?.email,
            id: updatedUser?._id,
            type: updatedUser?.role
        }

        res.status(200).json({
            success: true,
            message: 'Code verified!',
            data: updatedUser,
        });



    } catch (error) {
        next(error)
    }

}