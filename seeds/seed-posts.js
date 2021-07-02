const { Post } = require("../models");

const postData = [
  {
    title: "The answer to life, the universe, and everything",
    content: "42",
  },
  {
    title: "Best programming languages",
    content: "JavaScript, C#, Python",
  },
  {
    title: "Beach Boys",
    content: `California Girls.
    Sloop John B.
    Surfin' USA.`,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
