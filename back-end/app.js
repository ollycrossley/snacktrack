const express = require("express");
const app = express();
const {
  getBusinesses,
  getBusinessByName,
} = require("./controllers/business-controllers");

app.use(express.json());

app.get("/api/businesses", getBusinesses);
app.get("/api/businesses/:business_name", getBusinessByName);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
});
module.exports = app;
