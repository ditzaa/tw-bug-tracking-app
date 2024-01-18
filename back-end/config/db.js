const { Sequelize } = require("sequelize");

const database = new Sequelize("proiect_tw", "root", "root", {
  //TODO: change password
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
    timestamps: true,
  },
});

module.exports = database;
