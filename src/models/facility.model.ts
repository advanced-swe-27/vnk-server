import  { Schema, model, SchemaTypes } from 'mongoose';


const FacilitySchema = new Schema({
    name: {
        type: String,
        required: [true, "Status field is required"],
    },
    description: {
        type: String,
        required: [true, "Room field is required"],
    },
}, {
    timestamps: true
})

export const FacilityModel = model<any>("Facility", FacilitySchema);

