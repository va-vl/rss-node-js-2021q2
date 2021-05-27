/**
 * Catches errors in func and forwards them to error handling middleware
 * @typedef {Function} DecoratedFunc
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express next() method
 * @returns {void}
 */

/**
 * Creates a wrapper that catches errors in async code
 * @param {Function} func - function that is being wrapped
 * @returns {DecoratedFunc} - a function wrapped in error-catching promise
 */
const asyncErrorHandler = (func) =>
  /**
   * @type {DecoratedFunc}
   */
  (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => {
      next(err);
    });
  };
module.exports = asyncErrorHandler;
