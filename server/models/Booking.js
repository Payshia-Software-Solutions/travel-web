const mongoose = require("mongoose");
const commonFields = require("./CommonFields.js");

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  bookedDateTime: { type: Date, required: true, default: Date.now },
  tourId: { type: Schema.Types.ObjectId, ref: "Tour", required: true },
  payableAmount: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  country: { type: String, required: true },
  nationality: { type: String, required: true },
  destination: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  packageType: { type: String, required: true },
  participantType: { type: String, required: true },
  ...commonFields,
});

module.exports = model("Booking", bookingSchema);
