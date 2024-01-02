var express = require("express");
var router = express.Router();
const passport = require("passport");

const loginController = require("../controllers/loginController");
// const authenticate = require("../strategies/authentication");
// const login = require("../strategies/authentication");
const { login, checkLoggedIn } = require("../strategies/authentication");

router.get("/", loginController.check_if_user_logged_in);

router.get("/check-auth", (req, res, next) => {
  console.log(req.user._id);
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// POST signup form
router.post("/signup", loginController.signup_attempt_post);

// POST Login form
// when passport.authenticate is called its going through the localStrategy defined
// in app.js
router.post("/login", passport.authenticate("local"), login);

// POST logout request
router.post("/logout", loginController.logout_post);

module.exports = router;
