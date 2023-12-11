var express = require("express");
var router = express.Router();

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "Working heresssss" });
});

module.exports = router;
