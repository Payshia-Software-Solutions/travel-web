// server/models/Place.js
const mongoose = require("mongoose");
const commonFields = require("./CommonFields.js");

const placeSchema = new mongoose.Schema({
    placeName: { type: String, required: true },
    location: { type: String, required: true },
    images: { type: [String] },
    description: { type: String },
    tags: { type: [String] },
    ...commonFields,
}, { timestamps: true });

module.exports = mongoose.model("Place", placeSchema);