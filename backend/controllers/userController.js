const Blog = require("../models/blog");
const Author = require("../models/author");
const Comment = require("../models/comment");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.user_list = asyncHandler(async (req, res, next) => {
  const allUsers = await User.find().sort({ first_name: 1 }).exec();
  const allBlogs = await Blog.find().exec();

  res.status(200).json({ allUsers, allBlogs });
});

exports.user_blogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find({ user: req.params.userId })
    .populate("user")
    .exec();
  console.log(blogs);

  res.status(200).json(blogs).send();
});
