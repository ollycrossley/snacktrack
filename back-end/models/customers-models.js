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

exports.selectCustomerById = (_id) => {
    return Customer.findOne(
        { _id },
        { password: 0}
    ).then((response) => {
        if (response) {
            return response;
        } else {
            return Promise.reject({ status: 404, msg: "Customer not found" });
        }
    });
};
