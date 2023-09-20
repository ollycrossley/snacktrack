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
    console.log(response);
    return response;
  });
};
