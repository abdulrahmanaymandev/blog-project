const { faker } = require("@faker-js/faker");
const { Post } = require("../models/Post");

const createPosts = async (users, categories) => {
  const posts = [];

  for (let i = 0; i < 100; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    // Random likes
    const likes = [];

    const likesCount = Math.floor(Math.random() * 10);

    for (let j = 0; j < likesCount; j++) {
      const randomLikeUser = users[Math.floor(Math.random() * users.length)];

      if (!likes.includes(randomLikeUser._id)) {
        likes.push(randomLikeUser._id);
      }
    }

    posts.push({
      title: faker.lorem.sentence(5),
      description: faker.lorem.paragraphs(4),
      category: randomCategory.title,
      user: randomUser._id,
      image: {
        url: `https://picsum.photos/seed/${i}/1200/800`,
        publicId: null,
      },
      likes,
    });
  }

  return await Post.insertMany(posts);
};

module.exports = createPosts;
