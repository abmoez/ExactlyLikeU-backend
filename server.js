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
const FollowingModel = require("./models/followingModel");
const FollowersModel = require("./models/followersModel");
const BlockedModel = require("./models/blockedModel");
const reportModel = require("./models/reportModel");
const PostModel = require("./models/postModel");
const ReactModel = require("./models/reactModel");

FollowingModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(FollowingModel, { constraints: true, onDelete: "CASCADE" });

FollowersModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(FollowersModel, { constraints: true, onDelete: "CASCADE" });

BlockedModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(BlockedModel, { constraints: true, onDelete: "CASCADE" });

PostModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(PostModel, { constraints: true, onDelete: "CASCADE" });

ReactModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(ReactModel, { constraints: true, onDelete: "CASCADE" });

ReactModel.belongsTo(PostModel, { constraints: true, onDelete: "CASCADE" });
PostModel.hasMany(ReactModel, { constraints: true, onDelete: "CASCADE" });

UserModel.hasMany(reportModel, { constraints: true, onDelete: "CASCADE" });
reportModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });

sequelize
  .sync()
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
