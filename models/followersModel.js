const { Sequelize, DataTypes }=require("sequelize");
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
    followedUserId:{
       type: Sequelize.INTEGER,
       allowNull: false
    },
    dateOfFollow:DataTypes.DATE,
  },
  {
    tableName: "followers",
    timestamps: false,
  }
  );
  module.exports = Follower;