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

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await seed(customerData, businessData, reviewData);
});

afterAll(() => {
  mongoose.connection.close();
});

describe("/api/businesses", () => {
  describe("GET", () => {
    it("200: returns an array of businesses all with the correct properties", () => {
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

describe("/api/businesses/:business_name", () => {
  describe("GET", () => {
    it("200: returns an object with a business's relevant information", () => {
      return request(app)
        .get("/api/businesses/Wikivu")
        .expect(200)
        .then((response) => {
          const { business } = response.body;
          expect(business).toHaveProperty("business_name", "Wikivu");
          expect(business).toHaveProperty("total_rating");
          expect(business).toHaveProperty("no_of_ratings");
          expect(business).toHaveProperty("menu_url");
          expect(business).toHaveProperty("logo_url");
          expect(business).toHaveProperty("location");
          expect(business).toHaveProperty("created_at");
          expect(business).toHaveProperty("category");
          expect(business).toHaveProperty("owner_name");
          expect(business).toHaveProperty("business_bio");
          expect(business).toHaveProperty("_id");
          expect(business).toHaveProperty("is_active");
        });
    });
    it("404: returns the appropriate error when name does not match one in database", () => {
      return request(app)
        .get("/api/businesses/Wagyu")
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Username not found");
        });
    });
  });
});
