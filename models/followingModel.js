const { Sequelize, DataTypes }=require("sequelize");
const sequelize = require("../utils/database");

const Following = sequelize.define(
  "following",
  {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    followingUserId:{
       type: Sequelize.INTEGER,
       allowNull: false
    },
    dateOfFollow:DataTypes.DATE,
  },
  {
    tableName: "followings",
    timestamps: false,
  }
  );
  module.exports = Following;