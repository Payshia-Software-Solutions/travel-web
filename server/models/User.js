const mongoose = require("mongoose");
const commonFields = require("./CommonFields.js");

const { Schema, model } = mongoose;

// Define the User schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  addressL1: { type: String },
  addressL2: { type: String },
  city: { type: String },
  zipCode: { type: String },
  country: { type: String },
  phone: { type: String },
  ...commonFields,
});

// Export the User model
module.exports = model("User", userSchema);
