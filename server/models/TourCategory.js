const mongoose = require("mongoose");
const commonFields = require("./CommonFields.js");

const { Schema, model } = mongoose;

// Define the TourCategory schema
const tourCategorySchema = new Schema({
  categoryName: { type: String, required: true },
  ...commonFields,
});

// Export the TourCategory model
module.exports = model("TourCategory", tourCategorySchema);
