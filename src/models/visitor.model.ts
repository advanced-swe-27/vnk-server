import { Schema, model, SchemaTypes } from "mongoose";


const VisitorSchema = new Schema({
    surname: {
        type: SchemaTypes.String,
        required: [true, "Surname field is required"],
        minLength: [3, 'Surname field must be at least 3 characters long'],
    },
    othernames: {
        type: SchemaTypes.String,
        required: [true, "Othernames field is required"],
        minLength: [3, 'Othernames field must be at least 3 characters long'],
    },
    email: {
        type: SchemaTypes.String,
        required: [true, "Email field is required"],
        minLength: [3, 'Email field must be at least 3 characters long'],
    },
    phone: {
        type: SchemaTypes.String,
        required: [true, "Phone field is required"],
        minLength: [8, 'Phone field must be at least 8 characters long'],
    },
    residence: {
        type: SchemaTypes.String,
        required: [true, "Residence field is required"],
        minLength: [8, 'Residence field must be at least 8 characters long'],
    }, 
    sid: {
        type: SchemaTypes.String,
        default: null
    },
    isStudent: {
        type: SchemaTypes.Boolean,
        default: true
    },
    flagged: {
        type: SchemaTypes.Boolean,
        default: false
    },

}, {
    timestamps: true
})
export const VisitorModel = model<any>("Visitor", VisitorSchema);

