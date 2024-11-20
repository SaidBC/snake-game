const errorHandler = (err, req, res, next) => {
  res.json({ status: "FAILED", error: err });
};

module.exports = errorHandler;
