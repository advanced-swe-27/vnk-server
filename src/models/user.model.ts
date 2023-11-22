import mongoose, { Schema } from 'mongoose';

const USERSCHEMA = new Schema({
    surname: {
        type: String,
        required: [true, "Surname field is required"],
        minLength: [3, 'Surname field must be at least 3 characters long'],
    },
    othernames: {
        type: String,
        required: [true, "Othernames field is required"],
        minLength: [3, 'Othernames field must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: [true, "Email field is required"],
        minLength: [3, 'Email field must be at least 3 characters long'],
    },
    password: {
        type: String,
        required: [true, "Password field is required"],
        minLength: [3, 'Password field must be at least 3 characters long'],
    }, 
    role: {
        type: String,
        enum: ["hall-tutor", "chief-porter", "porter"],
        default: "porter"
    },
    token: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        required: [true, "Phone field is required"],
        minLength: [8, 'Phone field must be at least 8 characters long'],
    },
    isFirstLogin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const USER = mongoose.model("User", USERSCHEMA)

export default USER