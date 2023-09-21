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

const { newBusiness } = require("../data/postData/businesses");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await seed(customerData, businessData, reviewData);
});

afterAll(() => {
  mongoose.connection.close();
});

describe("/api", () => {
  test("GET 200   | Returns 200 and an object with correct endpoint values within", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(Object.keys(body).length > 0).toBe(true);
        for (const key in body) {
          expect(body[key]).toHaveProperty("description");
          expect(body[key]).toHaveProperty("queries");
          expect(body[key]).toHaveProperty("bodyFormat");
          expect(body[key]).toHaveProperty("exampleResponse");
        }
      });
  });
  test("GET 200   | Returns instructions for all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const endpointsInRes = [];
        const endpointsInApp = app._router.stack
          .filter((layer) => layer.route)
          .map((r) => r.route.path);
        for (const key in body) {
          endpointsInRes.push(key.substring(key.indexOf("/")));
        }
        expect(endpointsInRes).toIncludeSameMembers(endpointsInApp);
      });
  });
  test("GET 404   | Returns an appropriate message when passed an invalid endpoint url", () => {
    return request(app)
      .get("/api/cute_cats")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("url not found");
      });
  });
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
  describe("POST", () => {
    it("201: posts a new business and responds with the relevant business info", () => {
      return request(app)
        .post("/api/businesses/")
        .send(newBusiness)
        .expect(201)
        .then((response) => {
          const { business } = response.body;
          expect(business).toHaveProperty("_id");
          expect(business).toHaveProperty("location");
          expect(business).toHaveProperty("business_name");
          expect(business).toHaveProperty("is_active");
          expect(business).toHaveProperty("category");
          expect(business).toHaveProperty("total_rating");
          expect(business).toHaveProperty("no_of_ratings");
          expect(business).toHaveProperty("created_at");
          expect(business).toHaveProperty("opening_hours");
          expect(business).toHaveProperty("business_bio");
          expect(business).toHaveProperty("owner_name");
          expect(business).toHaveProperty("avatar_url");
          expect(business).toHaveProperty("logo_url");
          expect(business).toHaveProperty("menu_url");
          expect(business).toHaveProperty("password");
          expect(business).toHaveProperty("email");
          expect(business).toHaveProperty("username", "clisssssssandre5");
        });
    });
    it("400: returns appropriate error when required info is not provided", () => {
      const copyBusiness = { ...newBusiness };
      delete copyBusiness.email;
      return request(app)
        .post("/api/businesses")
        .send(copyBusiness)
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Required information missing");
        });
    });
    it("201: creates entry even if additional info is provided on body", () => {
      const copyBusiness = { ...newBusiness };
      copyBusiness.yearFound = 1999;
      return request(app)
        .post("/api/businesses")
        .send(copyBusiness)
        .expect(201)
        .then((response) => {
          const { business } = response.body;
          expect(business).not.toHaveProperty("yearFound");
        });
    });
  });
});

describe("/api/businesses/:_id", () => {
  describe("GET", () => {
    it("200: returns an object with a business's relevant information", () => {
      return request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const idToTest = businesses[8]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app).get(`/api/businesses/${idToTest}`).expect(200);
        })
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
    it("400: returns appropriate error when invalid id is used", () => {
      return request(app)
        .get("/api/businesses/Wagyu")
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid Id");
        });
    });
  });
});

describe("/api/customers", () => {
  describe("GET", () => {
    it("200: returns an array of customers all with the correct properties", () => {
      return request(app)
        .get("/api/customers")
        .expect(200)
        .then((response) => {
          const { customers } = response.body;
          expect(customers).toHaveLength(10);
          customers.forEach((customer) => {
            expect(customer).toHaveProperty("_id");
            expect(customer).toHaveProperty("username");
            expect(customer).toHaveProperty("email");
            expect(customer).toHaveProperty("avatar_url");
          });
        });
    });
  });
  describe("POST", () => {
    it("201: adds a customer to database and responds with the customer information", () => {
      return request(app)
        .post("/api/customers")
        .send({
          username: "Fred",
          email: "hi@hi.com",
          avatar_url: "http://dummyimage.com/242x212.png/dddddd/000000",
          password: "hihihihi",
        })
        .expect(201)
        .then((response) => {
          const { customer } = response.body;
          expect(customer).toHaveProperty("_id");
          expect(customer).toHaveProperty("username", "Fred");
          expect(customer).toHaveProperty("avatar_url");
          expect(customer).toHaveProperty("password");
          expect(customer).toHaveProperty("email");
        });
    });
    it("400: returns appropriate error when required info is not provided", () => {
      return request(app)
        .post("/api/customers")
        .send({
          email: "hi@hi.com",
          avatar_url: "http://dummyimage.com/242x212.png/dddddd/000000",
          password: "hihihihi",
        })
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Required information missing");
        });
    });
    it("201: creates entry even if additional info is provided on body", () => {
      return request(app)
        .post("/api/customers")
        .send({
          username: "Fred",
          email: "hi@hi.com",
          avatar_url: "http://dummyimage.com/242x212.png/dddddd/000000",
          password: "hihihihi",
          birthYear: 1999,
        })
        .expect(201)
        .then((response) => {
          const { customer } = response.body;
          expect(customer).not.toHaveProperty("birthYear");
        });
    });
  });
});

describe("/api/customers/:_id", () => {
  describe("GET", () => {
    it("200: returns an object with a customer's relevant information", () => {
      return request(app)
        .get("/api/customers")
        .then((response) => {
          const { customers } = response.body;
          const customerIdToTest = customers[8]._id;
          return customerIdToTest;
        })
        .then((customerIdToTest) => {
          return request(app)
            .get(`/api/customers/${customerIdToTest}`)
            .expect(200);
        })
        .then((response) => {
          const { customer } = response.body;
          expect(customer).toHaveProperty("username", "talfonsini8");
          expect(customer).toHaveProperty("_id");
          expect(customer).toHaveProperty("email");
          expect(customer).toHaveProperty("avatar_url");
        });
    });
    it("400: returns appropriate error when invalid id is used", () => {
      return request(app)
        .get("/api/customers/talfonsini8")
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid Id");
        });
    });
    it("404: returns the appropriate error when name does not match one in database", () => {
      return request(app)
        .get("/api/customers/650ae8a22dbbf4cd5f9eeabe")
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Customer not found");
        });
    });
  });
});

describe("/api/businesses/:_id/reviews", () => {
  describe("GET", () => {
    it("200: responds with all the relevant reviews for a relevant id", () => {
      return request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const idToTest = businesses[6]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .get(`/api/businesses/${idToTest}/reviews`)
            .expect(200)
            .then((response) => {
              const { reviews } = response.body;
              expect(reviews.length).toBe(10);
              reviews.forEach((review) => {
                expect(review).toHaveProperty("_id");
                expect(review).toHaveProperty("created_at");
                expect(review).toHaveProperty("rating");
                expect(review).toHaveProperty("business");
                expect(review).toHaveProperty("customer");
                expect(review.business.business_name).toBe("Youbridge");
                expect(review.customer).toHaveProperty("username");
              });
            });
        });
    });
    it("400: returns appropriate error when invalid id is used", () => {
      return request(app)
        .get("/api/businesses/Wagyu/reviews")
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid Id");
        });
    });
    it("404: returns the appropriate error when name does not match one in database", () => {
      return request(app)
        .get("/api/businesses/650ae8a22dbbf4cd5f9eeabe/reviews")
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Business not found");
        });
    });
    it("200: responds with an empty array if _id does exist but there are no reviews for that business", () => {
      return request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const idToTest = businesses[9]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .get(`/api/businesses/${idToTest}/reviews`)
            .expect(200)
            .then((response) => {
              const { reviews } = response.body;
              expect(reviews).toHaveLength(0);
            });
        });
    });
  });
});