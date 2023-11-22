import mongoose, { Schema } from 'mongoose';

const RESIDENTSCHEMA = new Schema({
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
    dob: {
        type: Date,
        required: [true, "DOB field is required"],
    }, 
    level: {
        type: String,
        enum: ["100" , "200" , "300" , "400" , "500" , "600" , "700"],
        default: "100"
    },
    sid: {
        type: String,
        required: [true, "Student ID field is required"],
        minLength: [8, 'Student ID field  must be at least 8 characters long'],
    },
    imageUrl: {
        type: String,
        required: [true, "Image is required"],
        minLength: [8, 'Image url must be at least 8 characters long'],
    },
    phone: {
        type: String,
        required: [true, "Phone field is required"],
        minLength: [8, 'Phone field must be at least 8 characters long'],
    },
    programme: {
        type: String,
        required: [true, "Programme field is required"],
        minLength: [8, 'Programme field must be at least 8 characters long'],
    },
}, {
    timestamps: true
})

const RESIDENT = mongoose.model("Resident", RESIDENTSCHEMA)

export default RESIDENT