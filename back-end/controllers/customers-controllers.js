const {selectCustomers, selectCustomerById} = require("../models/customers-models");

exports.getCustomers = (request, response, next) => {
    selectCustomers().then((customers) => {
        response.status(200).send({ customers });
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