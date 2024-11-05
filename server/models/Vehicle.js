const mongoose = require("mongoose");
const commonFields = require("./CommonFields.js");

const { Schema, model } = mongoose;

// Define the Vehicle schema
const VehicleSchema = new Schema({
    type: { type: String, required: true },
    owner: { type: String, required: true },
    vehicleNo: { type: String, required: true },
    seats: { type: String, required: true },
    availability: { type: String, required: true },
    ...commonFields,
});

// Export the Vehicle model
module.exports = model("Vehicle", VehicleSchema);