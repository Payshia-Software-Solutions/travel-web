const mongoose = require("mongoose");
const commonFields = require("./CommonFields.js");

const { Schema, model } = mongoose;

// Define the Agent schema
const AgentSchema = new Schema({
  no: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  secondaryPhone: { type: String }, // optional secondary phone number
  ...commonFields,
});

// Export the Agent model
module.exports = model("Agent", AgentSchema);
