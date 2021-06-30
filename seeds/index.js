const seedUsers = require("./seed-users");

const sequelize = require("../config/connection");

async function seedAll() {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  process.exit(0);
}

seedAll();
