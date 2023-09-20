const {
  selectCustomers,
  insertCustomers,
  selectCustomerById,
} = require("../models/customers-models");

exports.getCustomers = (request, response, next) => {
  selectCustomers().then((customers) => {
    response.status(200).send({ customers });
  });
};

exports.postCustomers = (request, response, next) => {
  const { body } = request;
  insertCustomers(body)
    .then((customer) => {
      response.status(201).send({ customer });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getCustomerById = (request, response, next) => {
  const { _id } = request.params;
  selectCustomerById(_id)
    .then((customer) => {
      response.status(200).send({ customer });
    })
    .catch((error) => {
      next(error);
    });
};
