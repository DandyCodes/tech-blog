require("dotenv").config();
const chalk = require("chalk");
const sequelizeConnection = require("./config/connection");
const seedUsers = require("./seeds/seed-users");

async function seedAll() {
  await sequelizeConnection.sync({ force: true });
  console.log(chalk.blue("\n----- DATABASE SYNCED -----\n"));

  await seedUsers();
  console.log(chalk.green("\n----- USERS SEEDED -----\n"));

  process.exit(0);
}

seedAll();
