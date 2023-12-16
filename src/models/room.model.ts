import  { Schema, model, SchemaTypes } from 'mongoose';


const RoomSchema = new Schema({
    num: {
        type: String,
        required: [true, "Room number field is required"],
        unique: true
    },
    capacity: {
        type: Number,
        required: [true, "Capacity field is required"],
        default: 4
    },
    gender: {
        type: String,
        required: [true, "Gender field is required"],
        enum: ["MALE" , "FEMALE"]
    },
}, {
    timestamps: true
})

export const RoomModel = model<any>("Room", RoomSchema);
