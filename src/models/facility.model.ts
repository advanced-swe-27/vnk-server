import  { Schema, model, SchemaTypes } from 'mongoose';


const FacilitySchema = new Schema({
    status: {
        type: String,
        required: [true, "Status field is required"],
        enum: ["assigned" , "unassigned" , "missing" , "unknown"]
    },
    room: {
        type: SchemaTypes.ObjectId,
        ref: "Room",
        required: [true, "Room field is required"],
    },
}, {
    timestamps: true
})

export const FacilityModel = model<any>("Facility", FacilitySchema);

