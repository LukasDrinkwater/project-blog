const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Object link to user
// title
// Blog content
// Timestamps TRUE
// Published TRUE/FALSE

const BlogSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, required: true },
  },
  { timestamps: true },
  { toJSON: { virtuals: true } }
);

BlogSchema.virtual("url").get(function () {
  return `/api/blogs/${this._id}`;
});

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
