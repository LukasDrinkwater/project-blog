const Blog = require("../models/blog");
const Author = require("../models/author");
const Comment = require("../models/comments");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET all blogs
exports.blog_list = asyncHandler(async (req, res, next) => {
  // const allBlogs = await Blog.find()
  //   .populate("Author")
  //   .sort({ createdAt: 1 })
  //   .exec();

  console.log("here");
  res.json({ message: "HELLO IM WORKING IN JSON" });
});

// GET specific blog

// POST new blog

// GET request to update blog

// POST request to update blog

// GET request to delete blog

// POST reqiest to delete blog
