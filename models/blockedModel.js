const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Blocked = sequelize.define(
  "blocked",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    blockedUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "BlockedList",
    timestamps: true,
    createdAt: "dateOfBlock",
  }
);
module.exports = Blocked;
