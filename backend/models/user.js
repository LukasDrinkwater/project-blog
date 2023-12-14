const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

// First name
// Last name
// Username
// Email
// country
// admin TRUE/FALSE

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

UserSchema.virtual("fullName").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("User", UserSchema);
