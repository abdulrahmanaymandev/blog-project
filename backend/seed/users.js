const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const { User } = require("../models/User");

const createUsers = async () => {
  const users = [];

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("Password123!", salt);

  // Admin User
  users.push({
    username: "Abdulrahman",
    email: "admin@inkline.com",
    password: hashedPassword,
    bio: "Founder of Inkline",
    isAdmin: true,
    isAccountVerified: true,
    profilePhoto: {
      url: faker.image.avatar(),
      publicId: null,
    },
  });

  // Fake Users
  for (let i = 0; i < 20; i++) {
    users.push({
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: hashedPassword,
      bio: faker.person.bio(),
      isAdmin: false,
      isAccountVerified: true,
      profilePhoto: {
        url: faker.image.avatar(),
        publicId: null,
      },
    });
  }

  const createdUsers = await User.insertMany(users);

  return createdUsers;
};

module.exports = createUsers;
