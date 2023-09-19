const mongoose = require("mongoose");
const request = require("supertest");

const { seed } = require("../seed");
const app = require("../app");

const customerData = require("../data/test/Customers");
const businessData = require("../data/test/Businesses");
const reviewData = require("../data/test/Reviews");

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

describe("getBusinesses", () => {
  describe("GET", () => {
    it("returns an array of businesses all with the correct properties", () => {
      return request(app)
        .get("/api/businesses")
        .expect(200)
        .then((response) => {
          const { businesses } = response.body;
          expect(businesses).toHaveLength(10);
          businesses.forEach((business) => {
            expect(business).toHaveProperty("_id");
            expect(business).toHaveProperty("location");
            expect(business).toHaveProperty("business_name");
            expect(business).toHaveProperty("is_active");
            expect(business).toHaveProperty("category");
            expect(business).toHaveProperty("total_rating");
            expect(business).toHaveProperty("no_of_ratings");
          });
        });
    });
  });
});
