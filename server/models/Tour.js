const mongoose = require("mongoose");
const commonFields = require("./CommonFields.js");

const { Schema, model } = mongoose;

// Define the TourSchedule schema
const tourScheduleSchema = new Schema({
  dayId: { type: Number },
  dayTitle: { type: String },
  dayPlan: { type: String },
});

// Define the Tour schema
const tourSchema = new Schema(
  {
    tourId: { type: String, required: true, unique: true },
    tourName: { type: String, required: true },
    highlightText: { type: String },
    tourDetails: { type: String },
    tourPrice: { type: Number, required: true },
    participants: { type: Number },
    tourCover: { type: String },
    tourGallery: { type: [String] },
    noOfDays: { type: Number, required: true },
    aboutCover: { type: String },
    tags: { type: [String] },
    basePlace: { type: [String] },
    tourSchedule: [tourScheduleSchema],
    tourCategory: { type: Schema.Types.ObjectId, ref: "TourCategory" },
    inclusions: { type: [String], default: [] },
    ...commonFields,
  },
  { timestamps: true }
);

module.exports = model("Tour", tourSchema);
