const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const BookingSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    countryCode: { type: String, required: true }, // New field for country code
    mobile: { type: String, required: true },
    livingCountry: { type: String, required: true },
    nationality: { type: String, required: true },
    destination: { type: String, required: true },
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true },
    packageType: {
      type: String,
      enum: ["silver", "gold", "platinum","bronze"],
      required: true,
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

// Export the Booking model
module.exports = model("Booking", BookingSchema);
