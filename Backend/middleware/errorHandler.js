const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // helpful for debugging

  res.status(500).json({
    message: err.message || "Server Error",
  });
};

module.exports = errorHandler;
