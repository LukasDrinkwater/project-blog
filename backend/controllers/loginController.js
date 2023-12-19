const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

// Passport imports
const passport = require("passport");

// exports.signup_attempt_post = asyncHandler(async (req, res, next) => {
//   console.log("signing up");
//   res.json({ message: "attemping signup" });
// });

exports.signup_attempt_post = [
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First Name is required")
    .escape(),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name is required")
    .escape(),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username is required")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 characters")
    .escape(),
  body("email")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("country")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Country is required")
    .escape(),
  // body("admin").escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("user signup error");
      res.status(422).location("http://localhost:5173/signup");
      return;
    } else {
      // make new user
      console.log(req.body);
      const user = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        country: req.body.country,
        admin: req.body.admin,
      });
      await user.save();
      console.log("user saved");
      res.redirect(301, "http://localhost:5173/login");
      // https://stackoverflow.com/questions/33020603/redirect-after-post-using-reactjs
    }
  }),
];

// .authenticate looks at the request body for parameters named username
//  and password then runs the LocalStrategy function
exports.login_attempt_post = passport.authenticate("local", {
  successRedirect: "http://localhost:5173/blogs",
  failureRedirect: "http://localhost:5173/login",
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
