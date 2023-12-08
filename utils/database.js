const Sequelize = require("sequelize");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const connectionString = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;

const sequelize = new Sequelize(connectionString);

module.exports = sequelize;
