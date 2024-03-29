const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
// Requirements for passport
const session = require("express-session");
const passport = require("passport");
// const LocalStrategy = require("passport-local");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
// JWT

// Model import
const User = require("./models/user");

// Import Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const authRouter = require("./routes/authRoutes");
const commentRouter = require("./routes/commentRoutes");

const app = express();

// setup the mongoose mongoDB connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_STRING;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
console.log(mongoose.connection.readyState);

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false })); //set to true for JSON
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  //cors is needed to allow requests from the React front end
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const SECRET_STRING = process.env.SECRET_STRING;
app.use(
  session({ secret: SECRET_STRING, resave: false, saveUninitialized: true })
);
// Middleware setup for passport

// Passport local strategy
// This function is what will be called when using passport.authenticate()
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
// sessions and serialization
passport.serializeUser((user, done) => {
  // console.log("serialize");
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  // console.log("deserialize");
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
app.use(express.urlencoded({ extended: false })); //set to true for JSON
app.use(passport.initialize());
app.use(passport.session());

// Routes setup
app.use("/blogs", blogRouter);

app.use("/blogs/:blogId/comment", commentRouter);
// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
