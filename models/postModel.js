const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Post = sequelize.define(
  "post",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    statusOfPost: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    statusOfUser: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    clicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "posts",
    timestamp: true,
    createdAt: "PostDate",
  }
);

module.exports = Post;
