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
router.get("/:blogId/edit/test", blogController.blog_update_test);
router.post("/:blogId/edit", blogController.blog_update_post);

// GET specific blog to EDIT
router.get("/:blogId/edit", blogController.blog_update_get);



module.exports = router;
