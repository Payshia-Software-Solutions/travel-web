const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const InclusionSchema = new Schema(
    {
        tourId: {
            type: Schema.Types.ObjectId,
            ref: "Tour", // Reference to the Tour model
            required: true,
        },
        packageType: {
            type: String,
            enum: ["silver", "gold", "platinum", "bronze"],
            required: true,
        },
        inclusions: {
            type: [String],
            required: true,
        },
        price: {
            type: Number, // Numeric type for prices
            required: true, // Ensure this field is mandatory
            min: 0, // Optionally ensure the price cannot be negative
        },
    },
    { timestamps: true }
);

// Export the Inclusion model
module.exports = model("Inclusion", InclusionSchema);
