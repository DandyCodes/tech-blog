require("dotenv").config();
const { User, Post, Comment } = require("./models");
const chalk = require("chalk");
const sequelizeConnection = require("./config/connection");
const seedUsers = require("./seeds/seed-users");
const seedPosts = require("./seeds/seed-posts");

async function seedAll() {
  await sequelizeConnection.sync({ force: true });
  console.log(chalk.blue("\n----- DATABASE SYNCED -----\n"));

  await seedUsers();
  console.log(chalk.green("\n----- USERS SEEDED -----\n"));

  await seedPosts();
  const posts = await Post.findAll();
  const users = await User.findAll();
  for (const post of posts) {
    await post.setUser(users[0]);
  }

  console.log(chalk.green("\n----- POSTS SEEDED -----\n"));

  await process.exit(0);
}

seedAll();
