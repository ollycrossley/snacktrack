const express = require("express");
const app = express();
const {getBusinesses} = require("./controllers/business-controllers");

app.use(express.json());

app.get("/api/businesses", getBusinesses);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
});
module.exports =  app ;
