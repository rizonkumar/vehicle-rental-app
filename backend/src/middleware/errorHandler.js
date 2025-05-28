const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.name} - ${err.message}`);
  console.error(err.stack);

  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    return res
      .status(400)
      .json({ error: err.errors.map((e) => e.message).join(", ") });
  }

  return res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
