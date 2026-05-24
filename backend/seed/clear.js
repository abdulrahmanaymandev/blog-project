require("dotenv").config();
const mongoose = require("mongoose");

const { User } = require("../models/User");
const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment");
const { Category } = require("../models/Category");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const clearDatabase = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await Comment.deleteMany();
    await Category.deleteMany();

    console.log("Database cleared ✅");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

clearDatabase();
