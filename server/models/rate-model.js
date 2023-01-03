const { Schema, model, Types } = require("mongoose");

const RateSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  review: { type: Types.ObjectId, ref: "Review" },
  rate: { type: Number, required: true },
});

module.exports = model("Rate", RateSchema);
