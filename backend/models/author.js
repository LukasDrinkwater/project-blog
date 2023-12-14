const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// First name
// Last name
// Country

const AuthorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  country: { type: String, required: true },
});

AuthorSchema.virtual("url").get(function () {
  return `/api/authors/${this._id}`;
});

module.exports = mongoose.model("Author", AuthorSchema);
