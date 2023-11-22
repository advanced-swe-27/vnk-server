import mongoose, { Schema } from 'mongoose';

const FACILITYSCHEMA = new Schema({
    status: {
        type: String,
        required: [true, "Gender field is required"],
        enum: ["assigned" , "unassigned" , "missing" , "unknown"]
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "Phone field is required"],
    },
}, {
    timestamps: true
})

const FACILITY = mongoose.model("Facility", FACILITYSCHEMA)

export default FACILITY