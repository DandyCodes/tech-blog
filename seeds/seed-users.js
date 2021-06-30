const { User } = require("../models");

const userData = [
  {
    username: "larrylaffer",
    password: "password1234",
  },
  {
    username: "gabrielknight",
    password: "password1234",
  },
  {
    username: "laverne",
    password: "password1234",
  },
  {
    username: "kinggraham",
    password: "password1234",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
