const Blog = require("../models/blog");
const Author = require("../models/author");
const Comment = require("../models/comment");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET all blogs
exports.blog_list = asyncHandler(async (req, res, next) => {
  // console.log("get blogs", req.user);
  const allBlogs = await Blog.find()
    .populate("user")
    .sort({ createdAt: 1 })
    .exec();

  res.json(allBlogs);
});

// GET specific blog
exports.blog_detail = asyncHandler(async (req, res, next) => {
  // console.log(req.user);
  const [blog, allComments] = await Promise.all([
    Blog.findById(req.params.blogId).populate("user").exec(),
    Comment.find({ blog: req.params.blogId })
      .populate("user")
      .sort({ createdAt: -1 }),
  ]);
  if (blog === null) {
    const err = new Error("Blog not found");
    err.status(404);
    return next(err);
  }

  res.json({ blog, comments: allComments, user: req.user });
});

// POST create new blog
exports.blog_create_post = [
  // validate and sanitise fields
  body("author")
    .trim()
    .isLength({ min: 1 })
    .withMessage("An author must be selected")
    .escape(),
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Blog must have a title.")
    .escape(),
  body("content").trim().isLength({ min: 1 }).escape(),
  body("published").isBoolean().escape(),

  asyncHandler(async (req, res, next) => {
    // Extract validation errors
    const errors = validationResult(req);

    // create the new blog object with checked data
    const blog = new Blog({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      // There were errors
      errors.array();
      res.json({ blog, errors });
      return;
    } else {
      // Data from the form is valid. Save new blog.
      await blog.save();
      res.location(blog.url);
      res.status(201).send();
    }
  }),
];

// GET request to delete blog

// POST request to delete blog
exports.blog_delete_post = asyncHandler(async (req, res, next) => {
  const [blog, allComments] = await Promise.all([
    Blog.findById(req.params.id).exec(),
    Comment.find({ blog: req.params.id }).exec(),
  ]);

  await Blog.findByIdAndRemove(req.body.blogId);

  await Comment.findByIdAndRemove({ blog: req.body.blogId });

  res.location("/api/blogs");
  res.status(410).send();
});

// GET request to update blog
exports.blog_update_get = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).exec();

  if (blog === null) {
    // No results
    const err = new Error("Blog not found");
    err.status = 404;
    return next(err);
  }

  if (blog.posted === true) {
    blog.posted.checked = "true";
  }
  res.json(blog);
});

// POST request to update blogreus17#

exports.blog_update_post = [
  // Validate and sanitise fields
  body("author")
    .trim()
    .isLength({ min: 1 })
    .withMessage("An author must be selected")
    .escape(),
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Blog must have a title.")
    .escape(),
  body("content").trim().isLength({ min: 1 }).escape(),
  body("published").isBoolean().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const blog = new Blog({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    });

    if (!errors.isEmpty()) {
      // Errors send back data
      errors.array();

      res.status(400).json(blog, errors);
    } else {
      // Data is valid, update blog

      await Blog.findByIdAndUpdate(req.params.id, blog, {});

      res.location(blog.url);
      res.status(201).send();
    }
  }),
];

// exports.blog_add_comment_post = [
//   body("commentText", "Comment must be more than 1 character")
//     .trim()
//     .isLength({ min: 1 })
//     .escape(),

//   asyncHandler(async (req, res, next) => {
//     console.log();
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors }).send();
//     } else {
//       const comment = new Comment({
//         blog: req.body.blogId,
//         user: req.user._id,
//         text: req.body.commentText,
//       });

//       try {
//         await comment.save();
//       } catch (error) {
//         console.log(error.message);
//         res.status(422).json(error);
//       }
//       res.status(201).send("Comment added");
//     }
//   }),
// ];
