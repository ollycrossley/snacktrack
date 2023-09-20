const {
  selectBusinesses,
  selectBusinessesByName,
} = require("../models/business-models");

exports.getBusinesses = (request, response, next) => {
  selectBusinesses().then((businesses) => {
    response.status(200).send({ businesses });
  });
};

exports.getBusinessByName = (request, response, next) => {
  const { business_name } = request.params;
  selectBusinessesByName(business_name)
    .then((business) => {
      response.status(200).send({ business });
    })
    .catch((error) => {
      next(error);
    });
};
