var express = require("express");
var router = express.Router();

const loginController = require("../controllers/loginController");
// const authenticate = require("../strategies/authentication");

// POST signup form
router.post("/signup", loginController.signup_attempt_post);

// POST Login form
router.post("/login", loginController.login_attempt_post);
// alternate
// router.post("/login", authenticate.authenticate_login);

// GET logout request
router.get("/logout", loginController.logout_get);

module.exports = router;
