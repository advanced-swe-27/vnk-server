import  { Schema, model, SchemaTypes } from 'mongoose';


const KeyLogSchema = new Schema({
    room: {
        type: SchemaTypes.ObjectId,
        ref: "Room",
        required: [true, "Room field is required"],
    },
    openedBy: {
        type: SchemaTypes.ObjectId,
        ref: "Resident",
        required: [true, "Resident field is required"],
    },
    closedAt: {
        type: Date,
        default: null
    },
    closedBy: {
        type: SchemaTypes.ObjectId,
        ref: "Resident",
        default: null
    }
}, {
    timestamps: true
})

export const KeyLogModel = model<any>("KeyLog", KeyLogSchema);
