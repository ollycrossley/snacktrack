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
      username: 1,
      password: 1,
    }
  ).then((response) => {
    return response;
  });
};

exports.insertBusinesses = (body) => {
  return Business.insertMany(body).then((response) => {
    return response[0];
  });
};

exports.selectBusinessesById = (_id) => {
  return Business.findOne({ _id }, { email: 0, avatar_url: 0 }).then(
    (response) => {
      if (response) {
        return response;
      } else {
        return Promise.reject({ status: 404, msg: "Business not found" });
      }
    }
  );
};

exports.removeBusinessById = (_id) => {
  return Business.deleteOne({ _id }).then((response) => {
    if (!response.deletedCount) {
      return Promise.reject({ status: 404, msg: "Business not found" });
    }
  });
};

exports.updateBusinessById = (body, _id) => {
  const { rating, no_of_ratings } = body;
  const ratingObj = {};
  if (rating) {
    ratingObj.total_rating = rating;
    if (no_of_ratings) {
      ratingObj.no_of_ratings = no_of_ratings;
    }

    return Business.findOneAndUpdate(
      { _id },
      { $inc: ratingObj },
      { returnDocument: "after" }
    );
  }

  return Business.findOneAndUpdate(
    { _id },
    { $set: body },
    { returnDocument: "after" }
  ).then((response) => {
    if (!response) {
      return Promise.reject({ status: 404, msg: "Business not found" });
    }
    return response;
  });
};
