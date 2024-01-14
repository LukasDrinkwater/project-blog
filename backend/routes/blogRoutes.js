var express = require("express");
var router = express.Router();

const blogController = require("../controllers/blogController");

// GET list of all blogs
router.get("/", blogController.blog_list);

// GET create blog
// router.get("/blog", blogController.blog_update_get);

// GET specific blog
router.get("/:blogId", blogController.blog_detail);

// POST update specific blog

router.post("/:blogId/edit", blogController.blog_update_post);

// GET specific blog to EDIT
router.get("/:blogId/edit", blogController.blog_update_get);

// POST delete specific blog
router.post("/:blogId/delete", blogController.blog_delete_post);

// POST create new blog
router.post("/newBlog", blogController.blog_create_post);

module.exports = router;
