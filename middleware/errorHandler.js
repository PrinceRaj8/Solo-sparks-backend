// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    // Optionally include stack trace in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
