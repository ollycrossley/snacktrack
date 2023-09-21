const {
  selectBusinesses,
  selectBusinessesById,
  insertBusinesses,
  removeBusinessById,
} = require("../models/business-models");

exports.getBusinesses = (request, response, next) => {
  selectBusinesses().then((businesses) => {
    response.status(200).send({ businesses });
  });
};

exports.postBusinesses = (request, response, next) => {
  const { body } = request;
  insertBusinesses(body)
    .then((business) => {
      response.status(201).send({ business });
    })
    .catch((error) => {
      next(error);
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

exports.deleteReviewsByBusinessById = (request, response, next) => {
  const { _id } = request.params;
  removeBusinessById(_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
};
