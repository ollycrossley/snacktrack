const Review = require("../schemas/Reviews");

exports.selectReviewsByBusinessId = (_id) => {
  return Review.find({})
    .populate("business", { business_name: 1 })
    .populate("customer", { username: 1 })
    .then((response) => {
      const output = response.filter(
        (review) => review.business._id.toString() === _id
      );
      return output;
    });
};
