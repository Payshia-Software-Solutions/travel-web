const mongoose = require("mongoose");
const commonFields = require("./CommonFields.js");

const { Schema, model } = mongoose;

const paymentSchema = new Schema({
  refId: { type: String, required: true, unique: true },
  paymentAmount: { type: Number, required: true },
  paymentType: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  ...commonFields,
});

module.exports = model("Payment", paymentSchema);
