const mongoose = require("mongoose");
const Business = require("../schemas/Businesses");

exports.selectBusinesses = () => {
  return Business.find(
    {},
    {
      business_name: 1,
      category: 1,
      is_active: 1,
      location: 1,
      total_rating: 1,
      no_of_ratings: 1,
    }
  ).then((response) => {
    return response;
  });
};

exports.selectBusinessesByName = (business_name) => {
  return Business.findOne(
    { business_name },
    { password: 0, username: 0, email: 0, avatar_url: 0 }
  ).then((response) => {
    if (response) {
      return response;
    } else {
      return Promise.reject({ status: 404, msg: "Username not found" });
    }
  });
};
