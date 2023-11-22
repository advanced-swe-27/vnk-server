import mongoose, { Schema } from 'mongoose';

const VISITORSCHEMA = new Schema({
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
    phone: {
        type: String,
        required: [true, "Phone field is required"],
        minLength: [8, 'Phone field must be at least 8 characters long'],
    },
    residence: {
        type: String,
        required: [true, "Residence field is required"],
        minLength: [8, 'Residence field must be at least 8 characters long'],
    }, 
    sid: {
        type: String,
        default: null
    },
    isStudent: {
        type: Boolean,
        default: true
    },
    flagged: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})

const VISITOR = mongoose.model("Visitor", VISITORSCHEMA)

export default VISITOR