const mongoose = require("mongoose");
const { seed } = require("./seed");

const customerData = require("./data/test/Customers");
const businessData = require("./data/test/Businesses");
const reviewData = require("./data/test/Reviews");

const ENV = "production";

const pathToCorrectFile = `${__dirname}/.env.${ENV}`;
require("dotenv").config({ path: pathToCorrectFile });

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await seed(customerData, businessData, reviewData);
    await mongoose.connection.close();
  } catch (error) {
    console.error("connection failed" + error);
    process.exit(1);
  }
};

seedDB();
