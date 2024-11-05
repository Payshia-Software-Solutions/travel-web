// server/models/CommonFields.js
const { Schema } = require("mongoose");

const commonFields = {
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  isActive: { type: Boolean, default: true },
};

module.exports = commonFields;
