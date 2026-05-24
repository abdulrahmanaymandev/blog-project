const { Category } = require("../models/Category");

const createCategories = async (users) => {
  const categoryNames = [
    "Programming",
    "Technology",
    "Artificial Intelligence",
    "Design",
    "Cybersecurity",
    "Startups",
    "Mobile Development",
    "Backend",
    "Frontend",
    "DevOps",
  ];

  const categories = categoryNames.map((title, index) => ({
    title,
    user: users[index % users.length]._id,
  }));

  return await Category.insertMany(categories);
};

module.exports = createCategories;
