const {
  selectBusinesses,
  selectBusinessesById,
} = require("../models/business-models");

exports.getBusinesses = (request, response, next) => {
  selectBusinesses().then((businesses) => {
    response.status(200).send({ businesses });
  });
};

exports.getBusinessById = (request, response, next) => {
  const { _id } = request.params;
  selectBusinessesById(_id)
    .then((business) => {
      response.status(200).send({ business });
    })
    .catch((error) => {
      next(error);
    });
};
