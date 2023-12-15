const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Blog
// User
// Text
// Timestamp true

const CommentSchema = new Schema(
  {
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true },
  { toJSON: { virtuals: true } }
);

// virtuals

CommentSchema.virtual("url").get(function () {
  return `/api/blogs/comments/${this._id}}`;
});

CommentSchema.virtual("createdAtFormatted").get(function () {
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
module.exports = mongoose.model("Comment", CommentSchema);
