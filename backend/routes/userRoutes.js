var express = require("express");
var router = express.Router();

const userController = require("../controllers/userController");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// GET list of authors/users
router.get("/", userController.user_list);

// GET list of blogs for a single user
router.get("/:userId", userController.user_blogs);

module.exports = router;
