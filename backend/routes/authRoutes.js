var express = require("express");
var router = express.Router();

const loginController = require("../controllers/loginController");

// POST Login form
// router.post("/login", loginController.login_attempt_post);

// POST signup form
router.post("/signup", loginController.signup_attempt_post);

module.exports = router;
