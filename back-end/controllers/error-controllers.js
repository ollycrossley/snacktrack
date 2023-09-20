exports.handle400s = (error, request, response, next) => {
  console.log(error);
  if (error.kind === "ObjectId") {
    response.status(400).send({ msg: "Invalid Id" });
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
