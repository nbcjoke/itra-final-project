const { Schema, model, Types } = require("mongoose");
const Tag = require("./tags-model");

const ReviewSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  theme: { type: String, required: true },
  group: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, required: true },
  images: { type: Array },
  rate: { type: Number, required: true },
});

ReviewSchema.post("save", async (review) => {
  for (const tag of review.tags) {
    const createdTag = await Tag.findOne({ name: tag });
    if (createdTag) {
      createdTag.count++;
      createdTag.save();
    } else {
      Tag.create({ name: tag, count: 1 });
    }
  }
});

module.exports = model("Review", ReviewSchema);
