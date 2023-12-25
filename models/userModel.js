const { Sequelize, DataTypes } = require("sequelize");
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
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["male", "female"]], // Validation to allow only 'male' or 'female'
        msg: 'Gender must be either "male" or "female"',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'single', // Default value for status
      validate: {
        isIn: [["single", "married", "divorced", "widowed", "other"]],
      }, // Valid status values
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"), // Set default value to current timestamp
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
    passwordChangedAt: DataTypes.DATE,
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

// Define instance method 'changedPasswordAfter'
User.prototype.changedPasswordAfter = function(JTWTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JTWTimestamp < changedTimestamp;
  }
  return false;
};
User.prototype.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = User;
