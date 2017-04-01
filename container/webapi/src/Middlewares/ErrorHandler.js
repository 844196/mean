module.exports = {
  jsonParseErrorHandler(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400) {
      res.status(400).send(err.message)
    }
    next(err)
  },
  schemaValidationErrorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
      res.status(400).send(err.message)
    }
    next(err)
  },
  notFoundErrorHandler(err, req, res, next) {
    if (err.name === 'NotFoundError') {
      res.status(404).send(err.message)
    }
    next(err)
  },
}
