const {selectCustomers} = require("../models/customers-models");

exports.getCustomers = (request, response, next) => {
    selectCustomers().then((customers) => {
        response.status(200).send({ customers });
    });
};