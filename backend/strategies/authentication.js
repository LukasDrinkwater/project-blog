// Authenticate login

const passport = require("passport");

const login = (req, res) => {
  // If this function is called, authentication was successful.
  // `req.user` contains the authenticated user.
  // console.log("login req.user", req.user);
  res.status(200).json({ message: "Login successful", user: req.user });
};

module.exports = login;
