import mongoose, { Schema } from 'mongoose';

const KEYSCHEMA = new Schema({
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

const KEY = mongoose.model("Key", KEYSCHEMA)

export default KEY