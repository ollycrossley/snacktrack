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
const { patchBusiness } = require("../data/patchData/businesses");

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
  describe("PATCH", () => {
    it("200: updates a business (based on its id) with increased (or decreased) rating", () => {
      const copyBusiness = { ...patchBusiness };
      return request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const idToTest = businesses[0]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .patch(`/api/businesses/${idToTest}`)
            .send({ rating: 2 })
            .expect(200)
            .then((response) => {
              const { business } = response.body;
              expect(business.total_rating).toBe(20);
              expect(business.no_of_ratings).toBe(7);
            });
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
  describe("PATCH", () => {
    it("200: updates a business (based on its id) with the given values", () => {
      const copyBusiness = { ...patchBusiness };
      return request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const idToTest = businesses[0]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .patch(`/api/businesses/${idToTest}`)
            .send(copyBusiness)
            .expect(200)
            .then((response) => {
              const { business } = response.body;
              expect(business.location.longitude).toBe(-50);
              expect(business.location.latitude).toBe(50);
              expect(business.is_active).toBe(true);
              expect(business.opening_hours.monday).toEqual(["6:00", "15:00"]);
              expect(business.opening_hours.tuesday).toEqual(["6:00", "15:00"]);
              expect(business.opening_hours.wednesday).toEqual([
                "6:00",
                "15:00",
              ]);
              expect(business.opening_hours.thursday).toEqual([
                "6:00",
                "15:00",
              ]);
              expect(business.opening_hours.friday).toEqual(["6:00", "15:00"]);
              expect(business.opening_hours.saturday).toEqual([
                "6:00",
                "15:00",
              ]);
              expect(business.opening_hours.sunday).toEqual(["6:00", "15:00"]);
              expect(business.business_bio).toBe("my shop");
              expect(business.username).toBe("Billy");
              expect(business.password).toBe("Billy");
              expect(business.logo_url).toBe(
                "http://dummyimage.com/104x238.png/cc0000/ffffff"
              );
              expect(business.menu_url).toBe(
                "https://marketplace.canva.com/EAFKfB87pN0/1/0/1131w/canva-brown-and-black-illustration-fast-food-menu-y8NpubROdFc.jpg"
              );
              expect(business.avatar_url).toBe(
                "http://dummyimage.com/227x103.png/5fa2dd/ffffef"
              );
            });
        });
    });
    it("200: update works even if unnecessary extra info is added", () => {
      return request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const idToTest = businesses[0]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .patch(`/api/businesses/${idToTest}`)
            .send({ is_active: true, fish: "Salmon" })
            .expect(200)
            .then((response) => {
              const { business } = response.body;
              expect(business.is_active).toBe(true);
              expect(business).not.toHaveProperty("fish");
            });
        });
    });
    it("400: responds with appropriate error when invalid input type is used", () => {
      return request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const idToTest = businesses[3]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .patch(`/api/businesses/${idToTest}`)
            .send({ location: { latitude: "Right here" } })
            .expect(400)
            .then((response) => {
              const { msg } = response.body;
              expect(msg).toBe("Invalid input");
            });
        });
    });
    it("400: returns appropriate error when invalid id is used", () => {
      return request(app)
        .patch("/api/businesses/Wagyu")
        .send({
          username: "Billy",
        })
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid Id");
        });
    });
    it("404: responds with appropriate error message when id is valid but matches no business", () => {
      return request(app)
        .patch("/api/businesses/650ae8a22dbbf4cd5f9eeabe")
        .send({
          username: "Billy",
        })
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Business not found");
        });
    });
  });
  describe("DELETE", () => {
    it("204: deletes the business given its id", () => {
      let idToTest;
      return request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          idToTest = businesses[9]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app).delete(`/api/businesses/${idToTest}`).expect(204);
        })
        .then(() => {
          return request(app).get(`/api/businesses/${idToTest}`).expect(404);
        });
    });
    it("400: returns appropriate error when invalid id is used", () => {
      return request(app)
        .delete("/api/businesses/Wagyu")
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid Id");
        });
    });
    it("404: responds with appropriate error message when id is valid but matches no review", () => {
      return request(app)
        .delete("/api/businesses/650ae8a22dbbf4cd5f9eeabe")
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Business not found");
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
    it("404: returns the appropriate error when id does not match one in database", () => {
      return request(app)
        .get("/api/customers/650ae8a22dbbf4cd5f9eeabe")
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Customer not found");
        });
    });
  });
  describe("PATCH", () => {
    it("200: patches a customer given their id", () => {
      return request(app)
        .get("/api/customers")
        .then((response) => {
          const { customers } = response.body;
          const idToTest = customers[5]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .patch(`/api/customers/${idToTest}`)
            .send({
              username: "Billy",
              email: "billy@billy.com",
              password: "billybilly",
              avatar_url: "http://dummyimage.com/242x212.png/dddddd/000000",
            })
            .expect(200)
            .then((response) => {
              const { customer } = response.body;
              expect(customer.username).toBe("Billy");
              expect(customer.avatar_url).toBe(
                "http://dummyimage.com/242x212.png/dddddd/000000"
              );
              expect(customer.password).toBe("billybilly");
              expect(customer.email).toBe("billy@billy.com");
            });
        });
    });
    it("200: updates the customer even when unneccessary extra info is added", () => {
      return request(app)
        .get("/api/customers")
        .then((response) => {
          const { customers } = response.body;
          const idToTest = customers[3]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .patch(`/api/customers/${idToTest}`)
            .send({
              username: "Billy",
              email: "billy@billy.com",
              password: "billybilly",
              avatar_url: "http://dummyimage.com/242x212.png/dddddd/000000",
              birthYear: 1999,
            })
            .expect(200)
            .then((response) => {
              const { customer } = response.body;
              expect(customer).not.toHaveProperty("birthYear");
            });
        });
    });
    it("400: returns appropriate error when invalid id is used", () => {
      return request(app)
        .patch("/api/customers/Wagyu")
        .send({
          username: "Billy",
          email: "billy@billy.com",
          password: "billybilly",
          avatar_url: "http://dummyimage.com/242x212.png/dddddd/000000",
        })
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid Id");
        });
    });
    it("404: responds with appropriate error message when id is valid but matches no customer", () => {
      return request(app)
        .patch("/api/customers/650ae8a22dbbf4cd5f9eeabe")
        .send({
          username: "Billy",
          email: "billy@billy.com",
          password: "billybilly",
          avatar_url: "http://dummyimage.com/242x212.png/dddddd/000000",
        })
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Customer not found");
        });
    });
  });
  describe("DELETE", () => {
    it("204: deletes the customer given their id", () => {
      let idToTest;
      return request(app)
        .get("/api/customers")
        .then((response) => {
          const { customers } = response.body;
          idToTest = customers[5]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app).delete(`/api/customers/${idToTest}`).expect(204);
        })
        .then(() => {
          return request(app).get(`/api/customers/${idToTest}`).expect(404);
        });
    });
    it("400: returns appropriate error when invalid id is used", () => {
      return request(app)
        .delete("/api/customers/Wagyu")
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid Id");
        });
    });
    it("404: responds with appropriate error message when id is valid but matches no customer", () => {
      return request(app)
        .delete("/api/customers/650ae8a22dbbf4cd5f9eeabe")
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
                expect(review.customer).toHaveProperty("username");
                expect(review.customer).toHaveProperty("avatar_url");
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
    it("404: returns the appropriate error when id does not match one in database", () => {
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
          const idToTest = businesses[7]._id;
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
describe("/api/reviews", () => {
  describe("GET", () => {
    it("200: returns all reviews", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((response) => {
          const { reviews } = response.body;
          reviews.forEach((review) => {
            expect(review).toHaveProperty("_id");
            expect(review).toHaveProperty("created_at");
            expect(review).toHaveProperty("rating");
            expect(review).toHaveProperty("business");
            expect(review).toHaveProperty("customer");
            expect(review.business).toHaveProperty("business_name");
            expect(review.customer).toHaveProperty("username");
            expect(review.customer).toHaveProperty("avatar_url");
          });
        });
    });
  });
  describe("POST", () => {
    it("201: posts a review and responds with the relevant review info", () => {
      const businessId = request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const businessIdToTest = businesses[6]._id;
          return businessIdToTest;
        });
      const customerId = request(app)
        .get("/api/customers")
        .then((response) => {
          const { customers } = response.body;
          const customerIdToTest = customers[6]._id;
          return customerIdToTest;
        });
      return Promise.all([businessId, customerId]).then(
        ([businessId, customerId]) => {
          const reviewBody = {
            body: "Love it",
            rating: 5,
            customer: customerId,
            business: businessId,
          };
          return request(app)
            .post("/api/reviews")
            .send(reviewBody)
            .expect(201)
            .then((response) => {
              const { review } = response.body;
              expect(review.rating).toBe(5);
              expect(review.body).toBe("Love it");
              expect(review).toHaveProperty("customer");
              expect(review).toHaveProperty("business");
            });
        }
      );
    });
    it("201: posts a review and responds even if additional unnecessary info is added to the body", () => {
      const businessId = request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const businessIdToTest = businesses[6]._id;
          return businessIdToTest;
        });
      const customerId = request(app)
        .get("/api/customers")
        .then((response) => {
          const { customers } = response.body;
          const customerIdToTest = customers[6]._id;
          return customerIdToTest;
        });
      return Promise.all([businessId, customerId]).then(
        ([businessId, customerId]) => {
          const reviewBody = {
            body: "Love it",
            rating: 5,
            customer: customerId,
            business: businessId,
            feeling: "good",
          };
          return request(app)
            .post("/api/reviews")
            .send(reviewBody)
            .expect(201)
            .then((response) => {
              const { review } = response.body;
              expect(review).not.toHaveProperty("feeling");
            });
        }
      );
    });
    it("400: responds with appropriate error when required info is missing", () => {
      const businessId = request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const businessIdToTest = businesses[6]._id;
          return businessIdToTest;
        });
      const customerId = request(app)
        .get("/api/customers")
        .then((response) => {
          const { customers } = response.body;
          const customerIdToTest = customers[6]._id;
          return customerIdToTest;
        });
      return Promise.all([businessId, customerId]).then(
        ([businessId, customerId]) => {
          const reviewBody = {
            body: "Love it",
            customer: customerId,
            business: businessId,
          };
          return request(app)
            .post("/api/reviews")
            .send(reviewBody)
            .expect(400)
            .then((response) => {
              const { msg } = response.body;
              expect(msg).toBe("Required information missing");
            });
        }
      );
    });
    it("400: responds with error when input type for body element is invalid", () => {
      const businessId = request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const businessIdToTest = businesses[6]._id;
          return businessIdToTest;
        });
      const customerId = request(app)
        .get("/api/customers")
        .then((response) => {
          const { customers } = response.body;
          const customerIdToTest = customers[6]._id;
          return customerIdToTest;
        });
      return Promise.all([businessId, customerId]).then(
        ([businessId, customerId]) => {
          const reviewBody = {
            body: "Love it",
            rating: "Five",
            customer: customerId,
            business: businessId,
          };
          return request(app)
            .post("/api/reviews")
            .send(reviewBody)
            .expect(400)
            .then((response) => {
              const { msg } = response.body;
              expect(msg).toBe("Required information missing");
            });
        }
      );
    });
    it("404: responds with appropriate error when non-matching id is used in body", () => {
      const businessId = request(app)
        .get("/api/businesses")
        .then((response) => {
          const { businesses } = response.body;
          const businessIdToTest = businesses[6]._id;
          return businessIdToTest;
        });
      return Promise.all([businessId]).then(([businessId]) => {
        const reviewBody = {
          body: "Love it",
          rating: 5,
          customer: "650c2fa9575635aa2f65eb3f",
          business: businessId,
        };
        return request(app)
          .post("/api/reviews")
          .send(reviewBody)
          .expect(404)
          .then((response) => {
            const { msg } = response.body;
            expect(msg).toBe("ObjectId not found");
          });
      });
    });
  });
});
describe("/api/reviews/:_id", () => {
  describe("GET", () => {
    it("200: responds with the review matching the id", () => {
      return request(app)
        .get("/api/reviews")
        .then((response) => {
          const { reviews } = response.body;
          const idToTest = reviews[0]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .get(`/api/reviews/${idToTest}`)
            .expect(200)
            .then((response) => {
              const { review } = response.body;
              expect(review).toHaveProperty("rating", 5);
              expect(review).toHaveProperty(
                "body",
                "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
              );
            });
        });
    });
    it("400: returns appropriate error when invalid id is used", () => {
      return request(app)
        .get("/api/reviews/Wagyu")
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid Id");
        });
    });
    it("404: responds with appropriate error message when id is valid but matches no review", () => {
      return request(app)
        .get("/api/reviews/650ae8a22dbbf4cd5f9eeabe")
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Review not found");
        });
    });
  });
  describe("PATCH", () => {
    it("200: updates the comment and rating for a review", () => {
      return request(app)
        .get("/api/reviews")
        .then((response) => {
          const { reviews } = response.body;
          const idToTest = reviews[3]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .patch(`/api/reviews/${idToTest}`)
            .send({ rating: 2, body: "Not the best" })
            .expect(200)
            .then((response) => {
              const { review } = response.body;
              expect(review.rating).toBe(2);
              expect(review.body).toBe("Not the best");
            });
        });
    });
    it("200: updates the comment and rating for a review even when unneccessary extra info is added", () => {
      return request(app)
        .get("/api/reviews")
        .then((response) => {
          const { reviews } = response.body;
          const idToTest = reviews[3]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .patch(`/api/reviews/${idToTest}`)
            .send({ rating: 2, body: "Not the best", feeling: "good" })
            .expect(200)
            .then((response) => {
              const { review } = response.body;
              expect(review.rating).toBe(2);
              expect(review.body).toBe("Not the best");
              expect(review).not.toHaveProperty("feeling");
            });
        });
    });
    it("400: responds appropriate error message when invalid type is used in patch body", () => {
      return request(app)
        .get("/api/reviews")
        .then((response) => {
          const { reviews } = response.body;
          const idToTest = reviews[3]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app)
            .patch(`/api/reviews/${idToTest}`)
            .send({ rating: "Hi", body: "Not the best" })
            .expect(400)
            .then((response) => {
              const { msg } = response.body;
              expect(msg).toBe("Invalid input");
            });
        });
    });
    it("400: returns appropriate error when invalid id is used", () => {
      return request(app)
        .patch("/api/reviews/Wagyu")
        .send({ rating: 2, body: "Not the best" })
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid Id");
        });
    });
    it("404: responds with appropriate error message when id is valid but matches no review", () => {
      return request(app)
        .patch("/api/reviews/650ae8a22dbbf4cd5f9eeabe")
        .send({ rating: 2, body: "Not the best" })
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Review not found");
        });
    });
  });
  describe("DELETE", () => {
    it("204: succesfully deletes a review by its given id", () => {
      let idToTest;
      return request(app)
        .get("/api/reviews")
        .then((response) => {
          const { reviews } = response.body;
          idToTest = reviews[3]._id;
          return idToTest;
        })
        .then((idToTest) => {
          return request(app).delete(`/api/reviews/${idToTest}`).expect(204);
        })
        .then(() => {
          return request(app).get(`/api/reviews/${idToTest}`).expect(404);
        });
    });
    it("400: returns appropriate error when invalid id is used", () => {
      return request(app)
        .delete("/api/reviews/Wagyu")
        .expect(400)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Invalid Id");
        });
    });
    it("404: responds with appropriate error message when id is valid but matches no review", () => {
      return request(app)
        .delete("/api/reviews/650ae8a22dbbf4cd5f9eeabe")
        .expect(404)
        .then((response) => {
          const { msg } = response.body;
          expect(msg).toBe("Review not found");
        });
    });
  });
});
