const { Schema, model, Types } = require("mongoose");

const CommentSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  review: { type: Types.ObjectId, ref: "Review" },
  text: { type: String, required: true },
});

module.exports = model("Comment", CommentSchema);
