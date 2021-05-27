const { StatusCodes } = require('http-status-codes');

/**
 * Sends known errors, forwards other errors with next()
 * @param {Object} err error object
 * @param {Object} req Express request
 * @param {Object} res Express response
 * @param {Function} next Express next() method
 */
const appErrorHandler = (err, req, res, next) => {
  switch (err.code) {
    case 'ERR_ENTITY_NOT_FOUND': {
      res.status(StatusCodes.NOT_FOUND).send(err.message);
      break;
    }
    case 'ERR_DATA_CORRUPTED': {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
      break;
    }
    default: {
      next(err);
    }
  }
};

module.exports = appErrorHandler;
