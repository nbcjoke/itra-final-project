const { Schema, model } = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const TagsSchema = new Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
});

TagsSchema.plugin(findOrCreate);

module.exports = model("Tags", TagsSchema);
