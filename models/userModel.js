const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: { type: Sequelize.STRING, unique: true, allowNull: false },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userType: { type: Sequelize.STRING, defaultValue: "user" },
    tempCode: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
    tempCodeCreatedAt: {
      type: Sequelize.BIGINT,
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
