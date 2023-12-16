const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

exports.signup_attempt_post = asyncHandler(async (req, res, next) => {
  try {
    console.log("signing up");
    const user = new User({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      country: req.body.country,
      admin: req.body.admin,
    });
    const result = await user.save();
    res.location("/blogs");
  } catch (err) {
    return next(err);
  }
});

// first_name: { type: String, required: true },
// last_name: { type: String, required: true },
// username: { type: String, required: true },
// password: { type: String, required: true },
// email: { type: String, required: true },
// country: { type: String, required: true },
// admin: { type: Boolean, required: true },
