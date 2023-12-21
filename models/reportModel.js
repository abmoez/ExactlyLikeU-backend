const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Report = sequelize.define(
  "report",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    reportedUserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    typeOfReport: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["spam", "harassment", "inappropriate_content", "violence"]],
      },
    },
  },
  {
    tableName: "reports",
    timestamps: true,
    createdAt: "dateOfReport",
  }
);
module.exports = Report;
