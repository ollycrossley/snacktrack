const Customer = require("../schemas/Customers");

exports.selectCustomers = () => {
    return Customer.find(
        {},
        {
            username: 1,
            email: 1,
            avatar_url: 1
        }
    ).then((response) => {
        return response;
    });
};