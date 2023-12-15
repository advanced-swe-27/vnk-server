import  { Schema, model, SchemaTypes } from 'mongoose';


const RoomSchema = new Schema({
    number: {
        type: String,
        required: [true, "Room number field is required"],
    },
    capacity: {
        type: Number,
        required: [true, "Capacity field is required"],
        default: 4
    },
    gender: {
        type: String,
        required: [true, "Gender field is required"],
        enum: ["male" , "female"]
    },
    key: [{
        type: SchemaTypes.ObjectId,
        ref: "Key",
        required: [true, "Key field is required"],
    }
    ],
}, {
    timestamps: true
})

export const RoomModel = model<any>("Room", RoomSchema);
