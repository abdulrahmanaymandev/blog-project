const { faker } = require("@faker-js/faker");
const { Comment } = require("../models/Comment");

const createComments = async (users, posts) => {
  const comments = [];

  for (let i = 0; i < 300; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const randomPost = posts[Math.floor(Math.random() * posts.length)];

    comments.push({
      postId: randomPost._id,
      user: randomUser._id,
      username: randomUser.username,
      text: faker.lorem.sentences(2),
    });
  }

  return await Comment.insertMany(comments);
};

module.exports = createComments;
