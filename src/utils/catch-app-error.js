const catchAppError = (err, req, res, next) => {
  if (err.code === 'ERR_ENTITY_NOT_FOUND') {
    res.status(404).send('The entity could not be found!')
  } else {
    next(err);
  }
};

module.exports = catchAppError;