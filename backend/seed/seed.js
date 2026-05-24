require("dotenv").config();
const mongoose = require("mongoose");

const createUsers = require("./users");
const createCategories = require("./categories");
const createPosts = require("./posts");
const createComments = require("./comments");

const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const { Category } = require("../models/Category");

mongoose
  .connect(process.env.MONGO_CLOUD_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const seedDatabase = async () => {
  try {
    console.log("Deleting old data...");

    await User.deleteMany();
    await Post.deleteMany();
    await Comment.deleteMany();
    await Category.deleteMany();

    console.log("Creating users...");
    const users = await createUsers();

    console.log("Creating categories...");
    const categories = await createCategories(users);

    console.log("Creating posts...");
    const posts = await createPosts(users, categories);

    console.log("Creating comments...");
    await createComments(users, posts);

    console.log("Database seeded successfully ✅");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();
