const mongoose = require("mongoose");
const commonFields = require("./CommonFields.js");

const { Schema, model } = mongoose;

// Define the Blog schema
const BlogSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String, required: false },
    tags: { type: [String], required: false },
    publishedDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ["draft", "published", "archived"],
        default: "draft",
    },
    categories: { type: [String], required: false },
    comments: [{
        user: { type: String, required: true },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
    }, ],
    likes: { type: Number, default: 0 },
    imageUrl: { type: String, required: false },
    slug: { type: String, required: true, unique: true },
    ...commonFields,
}, { timestamps: true });

// Export the Blog model
module.exports = model("Blog", BlogSchema);