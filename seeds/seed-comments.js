const { Comment } = require("../models");

const commentData = [
  {
    content: "This is a comment",
  },
  {
    content: "Very informative",
  },
  {
    content: `This comment
    goes for
    several lines`,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
