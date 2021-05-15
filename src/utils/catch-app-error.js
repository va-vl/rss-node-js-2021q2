const catchAppError = (err, req, res, _) => {
  res.status(404).send('Something is missing')
};

module.exports = catchAppError;