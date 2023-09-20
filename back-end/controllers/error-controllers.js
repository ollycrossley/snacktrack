exports.handle404s = (error, request, response, next) => {
  if (error.status === 404) {
    response.status(error.status).send({ msg: error.msg });
  }
};
