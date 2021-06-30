const { Model, DataTypes } = require("sequelize");
const sequelizeConnection = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);

module.exports = Post;
