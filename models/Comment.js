const { Model, DataTypes } = require("sequelize");
const sequelizeConnection = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
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

module.exports = Comment;
