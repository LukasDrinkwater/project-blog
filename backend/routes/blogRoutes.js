var express = require("express");
var router = express.Router();

const blogController = require("../controllers/blogController");

const { checkLoggedIn } = require("../strategies/authentication");

// GET list of all blogs
router.get("/", blogController.blog_list);

// GET create blog
router.get("/blog", blogController.blog_update_get);

// GET specific blog
router.get("/:blogId", blogController.blog_detail);

module.exports = router;
