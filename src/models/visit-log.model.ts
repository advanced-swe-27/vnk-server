import  { Schema, model, SchemaTypes } from 'mongoose';

const VisitLogSchema = new Schema({
    visitor: {
        type: SchemaTypes.ObjectId,
        ref: "Visitor",
        required: [true, "Visitor field is required"],
    },
    checkout: {
        type: Date,
        default: null
    },
    room: {
        type: SchemaTypes.ObjectId,
        required: [true, "Room field is required"],
        ref: 'Room'
    },
}, {
    timestamps: true
})
export const VisitLogModel = model<any>("VisitLog", VisitLogSchema);