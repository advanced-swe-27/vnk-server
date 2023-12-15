import { Schema, model, SchemaTypes } from "mongoose";
import { __generateAuthToken } from "../helpers/token";
import { __genCode } from "../helpers/string";
import dayjs from "dayjs";
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    surname: {
        type: SchemaTypes.String,
        required: true,
    },
    othernames: {
        type: SchemaTypes.String,
        required: true,
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: SchemaTypes.String,
        required: true,
    }, 
    role: {
        type: SchemaTypes.String,
        enum: ["SUDO" , "ADMIN" , "PORTER"],
        default: "PORTER"
    },
    phone: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    verification: {
        type: new Schema({
            code: {
                type: SchemaTypes.String,
                required: true,
                default: function () {
                    return __genCode(6);
                },
            },
            expiresAt: {
                type: SchemaTypes.Date,
                required: true,
                default: function () {
                    return dayjs().add(10, "minutes");
                }
            }
        }),
        required: false,
    },
    meta: {
        isFirstLogin: {
            type: SchemaTypes.Boolean,
            default: true,
            required: true
        },
        isSuspended: {
            type: SchemaTypes.Boolean,
            default: false,
            required: true
        }
    },
    token: {
        type: SchemaTypes.String,
        default: null
    },
}, {
    timestamps: true
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(this.password, salt)
        this.password = hash;
        next();
    } catch (err: any) {
        next(err);
    }
})

UserSchema.methods.comparePasswords = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAuthToken = async function (): Promise<string> {
    let __token: string = await __generateAuthToken({
        id: this._id,
        email: this.email,
        type: this.role,
        isSuspended: this.meta.isSuspended
    })
    return __token
}


export const UserModel = model<any>("User", UserSchema);
