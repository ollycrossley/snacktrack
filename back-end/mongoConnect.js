
const mongoose = require("mongoose");
const { seed } = require("./seed");
const app = require("./app");

const customerData = require("./data/test/Customers");
const businessData = require("./data/test/Businesses");
const reviewData = require("./data/test/Reviews");

const ENV = "production";

const pathToCorrectFile = `${__dirname}/.env.${ENV}`;
require("dotenv").config({ path: pathToCorrectFile });
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await seed(customerData, businessData, reviewData);
    app.listen(9090, () => console.log("Server started on port 9090"));
  } catch (error) {
    console.error("connection failed" + error);
    process.exit(1);
  }
};

connectDB();

module.exports = connectDB;