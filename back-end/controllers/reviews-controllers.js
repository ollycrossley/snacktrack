const {
  selectReviews,
  insertReview,
  selectReviewsByBusinessId,
  selectReviewById,
  updateReviewById,
  removeReviewById,
} = require("../models/reviews-models");

exports.getReviews = (request, response, next) => {
  selectReviews().then((reviews) => {
    response.status(200).send({ reviews });
  });
};

exports.postReviews = (request, response, next) => {
  const { body } = request;
  insertReview(body)
    .then((review) => {
      response.status(201).send({ review });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getReviewById = (request, response, next) => {
  const { _id } = request.params;
  selectReviewById(_id)
    .then((review) => {
      response.status(200).send({ review });
    })
    .catch((error) => {
      next(error);
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

exports.patchReviewById = (request, response, next) => {
  const { body } = request;
  const { _id } = request.params;
  updateReviewById(body, _id)
    .then((review) => {
      response.status(200).send({ review });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteReviewById = (request, response, next) => {
  const { _id } = request.params;
  removeReviewById(_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
};
