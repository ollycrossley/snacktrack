const mongoose = require("mongoose");
const request = require("supertest");

const {seed} = require("../seed");
const {app} = require("../app");

const customerData = require('../data/test/Customers')
const businessData = require('../data/test/Businesses')
const reviewData = require('../data/test/Reviews')

const ENV = process.env.NODE_ENV;
const pathToCorrectFile = `${__dirname}/../.env.${ENV}`;
require("dotenv").config({ path: pathToCorrectFile });

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await seed(customerData, businessData, reviewData);
});

afterEach(async () => {
    await mongoose.connection.close();
});

