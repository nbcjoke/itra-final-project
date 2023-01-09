const { Schema, model } = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new Schema({
  email: { type: String, required: false },
  password: { type: String, required: false },
  name: { type: String, required: true },
  isAdmin: { type: Boolean },
  provider: { type: String },
  providerId: { type: String },
});

UserSchema.plugin(findOrCreate);

module.exports = model("User", UserSchema);
