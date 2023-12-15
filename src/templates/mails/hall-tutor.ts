"use strict";

import lodash from "lodash"

export default {
    HallTutorCreated: {
        subject: lodash.template("Hall Tutor Account Created"),
        message: lodash.template("Dear ${user.othernames} ${user.surname},\n\nYour Hall Tutor account has been created with\nEmail: ${user.email} \nPassword: ${password}\nRole: HALL TUTOR\n\nLog onto https://.com to explore")
    },
    HallTutorVerificationCode: {
        subject: lodash.template("Hall Tutor Account Verification"),
        message: lodash.template("Dear ${user.othernames} ${user.surname},\n\nYour verification code is ${code}")
    },
    HallTutorLoggedIn: {
        subject: lodash.template("Account Login"),
        message: lodash.template("Dear ${user.othernames} ${user.surname},\n\nWe just detected a recent login into your account. If this was you, you can safely ignore this email, otherwise you should change your password immediately.")
    },
    HallTutorAccountSuspended: {
        subject: lodash.template("Account Suspension"),
        message: lodash.template("Dear ${user.othernames} ${user.surname},\n\nYour account has been suspended. Kindly contact your managers to follow up. Until your account is unsuspended, you will not be able to use your account.")
    },
    HallTutorAccountUnSuspended: {
        subject: lodash.template("Account Unsuspended"),
        message: lodash.template("Dear ${user.othernames} ${user.surname},\n\nYour account has been unsuspended. You can now log into your account.")
    },
}