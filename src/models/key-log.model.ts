import  { Schema, model, SchemaTypes } from 'mongoose';


const KeyLogSchema = new Schema({
    room: {
        type: SchemaTypes.ObjectId,
        ref: "Room",
        required: [true, "Room field is required"],
    },
    checkin: {
        type: Date,
        required: [true, "Checkin field is required"],
    },
    checkout: {
        type: Date,
        default: null
    },
    resident: {
        type: SchemaTypes.ObjectId,
        ref: "Resident",
        required: [true, "Resident field is required"],
    }
}, {
    timestamps: true
})

export const KeyLogModel = model<any>("KeyLog", KeyLogSchema);
