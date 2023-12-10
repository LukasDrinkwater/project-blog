const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

// First name
// Last name
// Username
// Email
// admin TRUE/FALSE

UserSchema.virtual("fullName").get(function () {
  return `${this.first_name} ${this.last_name}`;
});
