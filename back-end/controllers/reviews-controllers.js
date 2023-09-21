const {
  selectReviews,
  selectReviewsByBusinessId,
} = require("../models/reviews-models");

exports.getReviews = (request, response, next) => {
  selectReviews().then((reviews) => {
    response.status(200).send({ reviews });
  });
};

exports.getReviewsByBusinessById = (request, response, next) => {
  const { _id } = request.params;
  selectReviewsByBusinessId(_id)
    .then((reviews) => {
      response.status(200).send({ reviews });
    })
    .catch((error) => {
      next(error);
    });
};
