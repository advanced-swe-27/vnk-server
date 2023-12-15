import  { Schema, model, SchemaTypes } from 'mongoose';

const VisitLogSchema = new Schema({
    visitor: {
        type: SchemaTypes.ObjectId,
        ref: "Visitor",
        required: [true, "Visitor field is required"],
    },
    checkin: {
        type: Date,
        required: [true, "Checkin field is required"],
    },
    checkout: {
        type: Date,
        default: null
    },
    place: {
        type: SchemaTypes.ObjectId,
        required: [true, "Place field is required"],
        refPath: 'placeModel'
    },
    placeModel: {
        type: String,
        enum: ['Room', 'Facility'], // Specify the possible values for placeModel
        required: true
    },
    isVisitingResident: {
        type: Boolean,
        required: true
    },
    visitee: {
        type: SchemaTypes.ObjectId,
        ref: "Resident",
        required: [true, "Visitee field is required"],
    }
}, {
    timestamps: true
})
export const VisitLogModel = model<any>("VisitLog", VisitLogSchema);