const { selectBusinesses } = require("../models/business-models");

exports.getBusinesses = (request, response, next) => {
  selectBusinesses().then((businesses) => {
    response.status(200).send({ businesses });
  });
};
