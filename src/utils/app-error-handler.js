const appErrorHandler = (err, req, res, next) => {
  switch (err.code) {
    case 'ERR_ENTITY_NOT_FOUND': {
      res.status(404).send(err.message);
      break;
    }
    case 'ERR_DATA_CORRUPTED': {
      res.status(500).send(err.message);
      break;
    }
    default: {
      next(err);
    }
  }
};

module.exports = appErrorHandler;
