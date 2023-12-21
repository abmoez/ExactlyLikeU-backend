const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Follower = sequelize.define(
  "follower",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    followedUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "followers",
    timestamps: true,
    createdAt: "dateOfFollow",
  }
);
module.exports = Follower;
