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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
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
