var express = require("express");
var router = express.Router();

const commentController = require("../controllers/commentController");

// POST new comment to blog
router.post("/add", commentController.blog_add_comment_post);

// POST delete comment
router.post("/:commentId/delete", commentController.blog_comment_delete_post);

module.exports = router;
