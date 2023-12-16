#! /usr/bin/env node

console.log(
  'This script populates some test blogs, users, comments to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Blog = require("./models/blog");
const Comment = require("./models/comment");
const User = require("./models/user");

const blogs = [];
const comments = [];
const users = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  await createUsers();
  await createBlogs();
  await createComments();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

// First name, Last name, Username, country, Email, admin
async function userCreate(
  index,
  first_name,
  last_name,
  username,
  password,
  country,
  email,
  admin
) {
  const user = new User({
    first_name: first_name,
    last_name: last_name,
    username: username,
    password: password,
    country: country,
    email: email,
    admin: admin,
  });

  await user.save();
  users[index] = user;
  console.log(`usermessage: ${username} ${email}`);
}

// user, title, content, published
async function blogCreate(index, user, title, content, published) {
  const blog = new Blog({
    user: user,
    title: title,
    content: content,
    published: published,
  });

  await blog.save();
  blogs[index] = blog;
  console.log(`Added blog: ${user} ${title}`);
}

// blog, user, text
async function commentCreate(index, blog, user, text) {
  const comment = new Comment({
    blog: blog,
    user: user,
    text: text,
  });

  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${blog} ${user} ${text}`);
}

// First name, Last name, Username, password, country, Email, admin
async function createUsers() {
  console.log("Adding messages");
  await Promise.all([
    userCreate(
      0,
      "John",
      "Doe",
      "johndoe123",
      "12345",
      "England",
      "johndoe@email.com",
      true
    ),
    userCreate(
      1,
      "Jane",
      "Doe",
      "janedoe123",
      "12345",
      "Wales",
      "janedoe@email.com",
      false
    ),
  ]);
}

// index, user, title, content, published
async function createBlogs() {
  console.log("Adding blogs");
  console.log(users);
  console.log(users);
  await Promise.all([
    blogCreate(
      0,
      users[0],
      "A Serendipitous Saturday Stroll",
      "test from JohnHey there, fellow wanderers! Today's spontaneous adventure led me through the charming streets of our beloved town. As I meandered, I stumbled upon a hidden gem—a quaint bookstore with a quirky facade. Intrigued, I stepped inside to discover a world of literary wonders. The musty scent of aged books greeted me warmly, and I lost myself in the aisles, discovering forgotten tales and timeless classics. Sometimes, the best journeys are unplanned, and today's serendipitous Saturday stroll taught me to embrace the unexpected. So, here's to the joy of stumbling upon the extraordinary in the ordinary! Happy exploring, friends",
      true
    ),
    blogCreate(
      1,
      users[0],
      "Embracing Change: A Coffee Shop Revelation",
      "Hey, coffee aficionados! Today, my routine took an unexpected detour when my usual spot was closed for renovations. Undeterred, I ventured into a cozy-looking café around the corner. The aroma of freshly ground beans enveloped me, and I found myself a nook by the window. As I sipped my cappuccino, I couldn't help but marvel at the beauty of change. Sometimes, the universe nudges us out of our comfort zones for a reason. New surroundings, new perspectives. So, here's to embracing change and finding inspiration in the unexpected. Who knew a closed door could lead to a steaming cup of revelation?",
      false
    ),
  ]);
}

// blog, user, text
async function createComments() {
  console.log("Adding messages");
  await Promise.all([
    commentCreate(0, blogs[0], users[0], "This is John, is my comment working"),
    commentCreate(1, blogs[0], users[1], "This is Jane, yes its working!"),
  ]);
}
