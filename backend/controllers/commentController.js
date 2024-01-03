const Blog = require("../models/blog");
const Author = require("../models/author");
const Comment = require("../models/comment");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.blog_add_comment_post = [
  body("commentText", "Comment must be more than 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    console.log();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors }).send();
    } else {
      const comment = new Comment({
        blog: req.body.blogId,
        user: req.user._id,
        text: req.body.commentText,
      });

      try {
        await comment.save();
      } catch (error) {
        console.log(error.message);
        res.status(422).json(error);
      }
      res.status(201).send("Comment added");
    }
  }),
];

exports.blog_comment_delete_post = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);

  if (comment === null) {
    res.status(404).json({ error: "Cant find comment" }).send();
  } else {
    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).send();
  }
});
