const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Object link to author
// Blog content
// Comments??
// Timestamps TRUE
// Published TRUE/FALSE

const BlogSchema = new Schema(
  {
    Author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    Content: { type: String, required: true },
    Comments: {},
    Published: {},
  },
  { timestamps: true }
);

MessageSchema.virtual("createdAtFormatted").get(function () {
  const createdAt = this.createdAt;

  // Format the createdAt timestamp using toLocaleString
  const formattedCreatedAt = createdAt.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  return formattedCreatedAt;
});
