require("dotenv").config();
const { User, Post, Comment } = require("./models");
const chalk = require("chalk");
const sequelizeConnection = require("./config/connection");
const seedUsers = require("./seeds/seed-users");
const seedPosts = require("./seeds/seed-posts");
const seedComments = require("./seeds/seed-comments");

async function seedAll() {
  await sequelizeConnection.sync({ force: true });
  console.log(chalk.blue("\n----- DATABASE SYNCED -----\n"));

  await seedUsers();
  const users = await User.findAll();
  console.log(chalk.green("\n----- USERS SEEDED -----\n"));

  await seedPosts();
  const posts = await Post.findAll();
  for (const post of posts) {
    await post.setUser(users[0]);
  }
  console.log(chalk.green("\n----- POSTS SEEDED -----\n"));

  await seedComments();
  const comments = await Comment.findAll();
  for (const comment of comments) {
    await comment.setPost(posts[1]);
    await comment.setUser(users[2]);
  }
  console.log(chalk.green("\n----- COMMENTS SEEDED -----\n"));

  await process.exit(0);
}

seedAll();
