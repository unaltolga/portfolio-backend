// Global error handler. Express knows this is an error handler
// because it has four parameters (err, req, res, next).
const handleError = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal server error.";

  // Mongoose errors do not have a status, so we set one here
  if (err.name === "CastError") {
    status = 400;
    message = `Invalid id: ${err.value}`;
  } else if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(" ");
  }

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    message: message,
  });
};

export default { handleError };
