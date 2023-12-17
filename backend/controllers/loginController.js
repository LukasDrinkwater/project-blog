const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

// Passport imports
const passport = require("passport");

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
    console.log("made user");
    await user.save();
    res.location("/blogs");
  } catch (err) {
    return next(err);
  }
});

exports.login_attempt_post = asyncHandler(async (req, res, next) => {
  // .authenticate looks at the request body for parameters named username
  //  and password then runs the LocalStrategy function
  console.log("checking");
  passport.authenticate("local", {
    successRedirect: "/blogs",
    failureRedirect: "/login",
  });
  console.log("checked?");
  next();
});

// Logout
exports.logout_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.location("http://localhost:5173/login");
  });
});

// first_name: { type: String, required: true },
// last_name: { type: String, required: true },
// username: { type: String, required: true },
// password: { type: String, required: true },
// email: { type: String, required: true },
// country: { type: String, required: true },
// admin: { type: Boolean, required: true },
