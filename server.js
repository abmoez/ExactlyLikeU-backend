const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const sequelize = require("./utils/database");
const UserModel = require("./models/userModel");
const followingModel =require("./models/followingModel");
const FollowersModel = require("./models/followersModel");
const BlockedModel = require("./models/blockedModel");
const reportModel= require("./models/reportModel");
followingModel.belongsTo(UserModel,{constraints:true , onDelete : 'CASCADE' });
FollowersModel.belongsTo(UserModel,{constraints:true , onDelete : 'CASCADE' });
BlockedModel.belongsTo(UserModel,{constraints:true , onDelete : 'CASCADE' });
reportModel.belongsTo(UserModel,{constraints:true , onDelete : 'CASCADE' });
sequelize
  .sync({ alter: true })
  .then((results) => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
