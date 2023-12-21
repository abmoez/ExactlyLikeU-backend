const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const React = sequelize.define(
  "react",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: "reacts",
    timestamps: true,
  }
);

module.exports = React;
