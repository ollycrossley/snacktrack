const mongoose = require("mongoose");
const {app} = require("./app");
const {seed} = require("./seed");

const customerData = require('./data/test/Customers')
const businessData = require('./data/test/Businesses')
const reviewData = require('./data/test/Reviews')

const ENV = "development";
const pathToCorrectFile = `${__dirname}/.env.${ENV}`;
require("dotenv").config({ path: pathToCorrectFile });

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await seed(customerData, businessData, reviewData);
    app.listen(3000, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
