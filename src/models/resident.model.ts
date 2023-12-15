import  { Schema, model, SchemaTypes } from 'mongoose';


const ResidentSchema = new Schema({
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
    dob: {
        type: SchemaTypes.Date,
        required: [true, "DOB field is required"],
    }, 
    level: {
        type: SchemaTypes.String,
        enum: ["100" , "200" , "300" , "400" , "500" , "600" , "700"],
        default: "100"
    },
    sid: {
        type: SchemaTypes.String,
        required: [true, "Student ID field is required"],
        minLength: [8, 'Student ID field  must be at least 8 characters long'],
    },
    imageUrl: {
        type: SchemaTypes.String,
        required: [true, "Image is required"],
        minLength: [8, 'Image url must be at least 8 characters long'],
    },
    phone: {
        type: SchemaTypes.String,
        required: [true, "Phone field is required"],
        minLength: [8, 'Phone field must be at least 8 characters long'],
    },
    programme: {
        type: SchemaTypes.String,
        required: [true, "Programme field is required"],
        minLength: [8, 'Programme field must be at least 8 characters long'],
    },
}, {
    timestamps: true
})

export const ResidentModel = model<any>("Resident", ResidentSchema);

