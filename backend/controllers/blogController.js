const Blog = require("../models/blog");
const Author = require("../models/author");
const Comment = require("../models/comment");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Entities is to decode any html text issues
const he = require("he");

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
  console.log("getting blog");
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
  const blog = await Blog.findById(req.params.blogId).exec();

  if (blog === null) {
    // No results
    const err = new Error("Blog not found");
    err.status = 404;
    return next(err);
  }

  // if (blog.posted === true) {
  //   blog.posted.checked = "true";
  // }
  res.json(blog);
});

// POST request to update blog

exports.blog_update_post = [
  body("blogTitle", "Blog title must not be blank.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("blogContent", "Blog content must not be blank")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    console.log("request received");
    // console.log(req.body.blogContent)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ error });
    } else {
      const title = req.body.blogTitle;

      // const content = req.body.blogContent;
      const content = he.decode(req.body.blogContent);
      console.log(content);

      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.blogId,
        { $set: { title, content } },
        { new: true }
      );

      res.status(200).json({ message: "Blog saved" });
    }
  }),
];

exports.blog_create_post = [
  body("title", "The title must be atleast 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "The blog content must be atleast 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("published").isBoolean(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      res.status(422).send();
    } else {
      // create new blog
      const blog = new Blog({
        user: req.user._id,
        title: req.body.title,
        content: req.body.content,
        published: req.body.published,
      });

      console.log("saving new blog");
      await blog.save();
      console.log(blog._id.toString());
      console.log("blog saved");
      res.status(201).send();
    }
  }),
];

// POST delete specific blog

exports.blog_delete_post = asyncHandler(async (req, res, next) => {
  const blog = await Blog.findById(req.params.blogId);

  if (blog === null) {
    res.status(404).json({ error: "Cant find blog" }).send();
  } else {
    await Blog.findByIdAndDelete(req.params.blogId);

    res.status(200).json({ message: "Blog deleted", blog }).send();
  }
});
