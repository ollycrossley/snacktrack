const Review = require("../schemas/Reviews");
const Business = require("../schemas/Businesses");

exports.selectReviews = () => {
  return Review.find({})
    .populate("business", { business_name: 1 })
    .populate("customer", { username: 1 })
    .then((response) => {
      return response;
    });
};

exports.selectReviewById = (_id) => {
  return Review.findOne({ _id })
    .populate("business", { business_name: 1 })
    .populate("customer", { username: 1 })
    .then((response) => {
      if (!response) {
        return Promise.reject({ status: 404, msg: "Review not found" });
      } else {
        return response;
      }
    });
};

exports.selectReviewsByBusinessId = (_id) => {
  if (!/[0-9a-f]{24}/i.test(_id)) {
    return Promise.reject({ status: 400, msg: "Invalid id" });
  }
  const reviews = Review.find({})
    .populate("business", { business_name: 1 })
    .populate("customer", { username: 1 });
  const businesses = Business.find();
  return Promise.all([reviews, businesses]).then(([reviews, businesses]) => {
    const acceptableIds = businesses.map((business) => business._id.toString());
    const output = reviews.filter(
      (review) => review.business._id.toString() === _id
    );
    if (!acceptableIds.includes(_id)) {
      return Promise.reject({ status: 404, msg: "Business not found" });
    } else {
      return output;
    }
  });
};

exports.updateReviewById = (body, _id) => {
  return Review.findOneAndUpdate(
    { _id },
    { $set: body },
    { returnDocument: "after" }
  ).then((response) => {
    if (!response) {
      return Promise.reject({ status: 404, msg: "Review not found" });
    }
    return response;
  });
};
