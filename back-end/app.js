const express = require("express");
const app = express();
const {
  getBusinesses,
  postBusinesses,
  getBusinessById,
} = require("./controllers/business-controllers");
const { getEndpoints } = require("./controllers/api-controllers");
const {
  getCustomers,
  postCustomers,
  getCustomerById,
} = require("./controllers/customers-controllers");
const {
  getReviewsByBusinessById,
} = require("./controllers/reviews-controllers");
const {
  handle400s,
  handle404s,
  handleServerError,
} = require("./controllers/error-controllers");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/businesses", getBusinesses);
app.post("/api/businesses", postBusinesses);

app.get("/api/businesses/:_id", getBusinessById);

app.get("/api/customers", getCustomers);
app.post("/api/customers", postCustomers);

app.get("/api/businesses/:_id/reviews", getReviewsByBusinessById);

app.get("/api/customers/:_id", getCustomerById);

app.use((req, res) => {
  res.status(404).send({ msg: "url not found" });
});

app.use(handle400s);

app.use(handle404s);

app.use(handleServerError);

module.exports = app;
