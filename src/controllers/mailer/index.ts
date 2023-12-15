"use strict";

import { __sendMail } from "./../../utils/mail"
import { mails as __templates } from "./../../templates"

export type EmailTemplates = "PorterCreated" | "PorterVerificationCode" | "PorterLoggedIn" | "PorterAccountSuspended" | "PorterAccountUnSuspended" | "ChiefPorterCreated" | "ChiefPorterVerificationCode" | "ChiefPorterLoggedIn" | "ChiefPorterAccountSuspended" | "ChiefPorterAccountUnSuspended" | "HallTutorCreated" | "HallTutorVerificationCode" | "HallTutorLoggedIn" | "HallTutorAccountSuspended" | "HallTutorAccountUnSuspended"| "HallTutorApproved" | "HallTutorRejected"

type EmailData = {
    user?: any
    code?: string
    password?: string
}

type SendEmailArgs = {
    args: {
        email: string
        template: EmailTemplates
        data: EmailData
    }
}

export async function sendMail({ args: { email, template, data } }: SendEmailArgs) {
    try {
        __templates[""]
        const subject = __templates[template].subject(data);
        const message = __templates[template].message(data);
        await __sendMail(email, subject, message).then(console.log).catch(console.error);

        return { delivered: 1, status: "ok" };
    }
    catch (err) {
        throw err
    }
}