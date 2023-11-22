import mongoose, { Schema } from 'mongoose';

const KEYLOGSCHEMA = new Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resident",
        required: [true, "Resident field is required"],
    }
}, {
    timestamps: true
})

const KEYLOG = mongoose.model("KeyLog", KEYLOGSCHEMA)

export default KEYLOG