const mongoose = require("mongoose");
const commonFields = require("./CommonFields.js");

const { Schema, model } = mongoose;

// Define the GetQuote schema
const GetQuoteSchema = new Schema({
  personalDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { 
      countryCode: { type: String, required: true }, 
      number: { type: String, required: true } 
    },
    livingCountry: { type: String, required: true },
    nationality: { type: String, required: true }
  },
  tourDetails: {
    destination: { type: String, required: true },
    arrivalDate: { type: Date, required: true },
    departureDate: { type: Date, required: true }
  },
  packageDetails: {
    packageType: { 
      type: String, 
      enum: ["silver", "gold", "platinum"], 
      required: true 
    },
    totalCost: { type: Number, required: true }
  },
  ...commonFields, // Adding common fields if there are shared properties
});

// Export the GetQuote model
module.exports = model("GetQuote", GetQuoteSchema);
