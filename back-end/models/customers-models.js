const Customer = require("../schemas/Customers");
exports.selectCustomers = () => {
  return Customer.find(
    {},
    {
      username: 1,
      email: 1,
      avatar_url: 1,
    }
  ).then((response) => {
    return response;
  });
};

exports.insertCustomers = (body) => {
  return Customer.insertMany(body).then((response) => {
    return response[0];
  });
};

exports.selectCustomerById = (_id) => {
  return Customer.findOne({ _id }, { password: 0 }).then((response) => {
    if (response) {
      return response;
    } else {
      return Promise.reject({ status: 404, msg: "Customer not found" });
    }
  });
};

exports.removeCustomerById = (_id) => {
  return Customer.deleteOne({ _id }).then((response) => {
    if (!response.deletedCount) {
      return Promise.reject({ status: 404, msg: "Customer not found" });
    }
  });
};
