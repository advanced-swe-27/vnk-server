import mongoose, { Schema } from 'mongoose';

const ROOMSCHEMA = new Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Key",
        required: [true, "Key field is required"],
    }
    ],
}, {
    timestamps: true
})

const ROOM = mongoose.model("Room", ROOMSCHEMA)

export default ROOM