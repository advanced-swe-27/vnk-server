import  { Schema, model, SchemaTypes } from 'mongoose';


const KeySchema = new Schema({
    status: {
        type: String,
        required: [true, "Gender field is required"],
        enum: ["assigned" , "unassigned" , "missing" , "unknown"]
    },
    room: {
        type: SchemaTypes.ObjectId,
        ref: "Room",
        required: [true, "Phone field is required"],
    },
}, {
    timestamps: true
})

export const KeyModel = model<any>("Key", KeySchema);
