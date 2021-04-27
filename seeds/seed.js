const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, postData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
