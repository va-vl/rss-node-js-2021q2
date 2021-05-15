const catchAppError = (err, req, res, next) => {
  if (err.name === 'MissingError') {
    res.status(404).send('Something is missing')
  } else {
    next(err);
  }
};

module.exports = catchAppError;