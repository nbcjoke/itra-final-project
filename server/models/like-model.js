const { Schema, model, Types } = require("mongoose");

const LikeSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  review: { type: Types.ObjectId, ref: "Review" },
});

module.exports = model("Like", LikeSchema);
