import mongoose, { Schema } from 'mongoose';

const VISITLOGSCHEMA = new Schema({
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resident",
        required: [true, "Visitee field is required"],
    }
}, {
    timestamps: true
})

const VISITLOG = mongoose.model("VisitLog", VISITLOGSCHEMA)

export default VISITLOG