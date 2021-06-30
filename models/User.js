const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelizeConnection = require("../config/connection");

class User extends Model {
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async user => {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      },
    },
    sequelize: sequelizeConnection,
  }
);

module.exports = User;
