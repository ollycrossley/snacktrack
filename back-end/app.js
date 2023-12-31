const express = require("express");
const cors = require('cors');
const app = express();
const {
  getBusinesses,
  postBusinesses,
  getBusinessById,
  patchBusinessById,
  deleteReviewsByBusinessById,
} = require("./controllers/business-controllers");
const { getEndpoints } = require("./controllers/api-controllers");
const {
  getCustomers,
  postCustomers,
  getCustomerById,
  patchCustomerById,
  deleteCustomerById,
} = require("./controllers/customers-controllers");
const {
  getReviews,
  postReviews,
  getReviewById,
  getReviewsByBusinessById,
  patchReviewById,
  deleteReviewById,
} = require("./controllers/reviews-controllers");
const {
  handle400s,
  handle404s,
  handleServerError,
} = require("./controllers/error-controllers");

app.use(cors());
app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/businesses", getBusinesses);
app.post("/api/businesses", postBusinesses);

app.get("/api/businesses/:_id", getBusinessById);
app.patch("/api/businesses/:_id", patchBusinessById);
app.delete("/api/businesses/:_id", deleteReviewsByBusinessById);

app.get("/api/customers", getCustomers);
app.post("/api/customers", postCustomers);

app.get("/api/businesses/:_id/reviews", getReviewsByBusinessById);

app.get("/api/customers/:_id", getCustomerById);
app.patch("/api/customers/:_id", patchCustomerById);
app.delete("/api/customers/:_id", deleteCustomerById);

app.get("/api/reviews", getReviews);
app.post("/api/reviews", postReviews);

app.get("/api/reviews/:_id", getReviewById);
app.patch("/api/reviews/:_id", patchReviewById);
app.delete("/api/reviews/:_id", deleteReviewById);

app.use((req, res) => {
  res.status(404).send({ msg: "url not found" });
});

app.use(handle400s);

app.use(handle404s);

app.use(handleServerError);

module.exports = app;
