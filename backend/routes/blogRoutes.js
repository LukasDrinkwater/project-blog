var express = require("express");
var router = express.Router();

const blogController = require("../controllers/blogController");

// GET list of all blogs
router.get("/", blogController.blog_list);

// GET create blog
router.get("/blog", blogController.blog_update_get);

// GET specific blog
router.get("/:blogId", blogController.blog_detail);

// // POST new comment to blog
// router.post("/:blogId/comment", blogController.blog_add_comment_post);

module.exports = router;
