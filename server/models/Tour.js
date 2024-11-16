const mongoose = require("mongoose");
const slugify = require("slugify");
const { Schema, model } = mongoose;

const DayPlanSchema = new Schema(
  {
    dayId: { type: Number, required: true },
    dayTitle: { type: String, required: true },
    dayPlan: { type: String, required: true },
  },
  { _id: false }
);

const TourSchema = new Schema(
  {
    dayPlans: { type: [DayPlanSchema], default: [] },
    tourId: { type: String, required: true },
    tourName: { type: String, required: true },
    slug: { type: String, unique: true }, 
    highlightText: { type: String, required: true },
    tourDetails: { type: String, required: true },
    tourPrice: { type: Number, required: true },
    participants: { type: Number, required: true },
    tourCover: { type: String },
    tourGallery: { type: [String], default: [""] },
    noOfDays: { type: Number, required: true },
    aboutCover: { type: String },
    tags: { type: [String], default: [] },
    basePlace: { type: [String], default: [] },
    tourSchedule: { type: [DayPlanSchema], required: true },
    tourCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

TourSchema.pre("save", function (next) {
  if (this.isModified("tourName")) { 
    this.slug = slugify(this.tourName, { lower: true, strict: true });
  }
  next();
});

module.exports = model("Tour", TourSchema);
