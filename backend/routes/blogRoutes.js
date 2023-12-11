var express = require("express");
var router = express.Router();

const blogController = require("../controllers/blogController");

/* GET home page. */
router.get("/blogs", blogController.blog_list);

module.exports = router;
