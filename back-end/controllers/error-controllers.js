exports.handle400s = (error, request, response, next) => {
  if (error.kind === "ObjectId" || error.status === 400) {
    response.status(400).send({ msg: "Invalid Id" });
  } else if (
    error._message === "Business validation failed" ||
    error._message === "Customer validation failed"
  ) {
    response.status(400).send({ msg: "Required information missing" });
  } else {
    next(error);
  }
};

exports.handle404s = (error, request, response, next) => {
  if (error.status === 404) {
    response.status(error.status).send({ msg: error.msg });
  }
};

exports.handleServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};
