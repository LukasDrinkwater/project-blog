const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Object link to author
// title
// Blog content
// Timestamps TRUE
// Published TRUE/FALSE

const BlogSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, required: true },
  },
  { timestamps: true }
);

BlogSchema.virtual("createdAtFormatted").get(function () {
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

module.exports = mongoose.model("Blog", BlogSchema);
