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
    is a 
    multiline template
    literal`,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
