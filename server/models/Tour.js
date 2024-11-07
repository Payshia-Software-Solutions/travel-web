const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TourScheduleSchema = new Schema({
  dayId: { type: Number, required: true },
  dayTitle: { type: String, required: true },
  dayPlan: { type: String, required: true },
});

const TourSchema = new Schema({
  inclusions: { type: [String], default: [] },
  tourId: { type: String, required: true },
  tourName: { type: String, required: true },
  highlightText: { type: String, required: true },
  tourDetails: { type: String, required: true },
  tourPrice: { type: Number, required: true },
  participants: { type: Number, required: true },
  tourCover: { type: String, required: true },
  tourGallery: { type: [String], default: [""] },
  noOfDays: { type: Number, required: true },
  aboutCover: { type: String, default: "" },
  tags: { type: [String], default: [] },
  basePlace: { type: [String], default: [] },
  tourSchedule: { type: [TourScheduleSchema], default: [] },
  tourCategory: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Export the Tour model
module.exports = model("Tour", TourSchema);
