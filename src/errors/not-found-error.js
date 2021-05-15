class NotFoundError extends Error {
  constructor(entity, id, message = '') {
    const messageError = message === '' ? '' : ` ${message}`;
    super(`Oops...There is no ${entity} with this id ${id} ${messageError}`);
  }
}

module.exports = NotFoundError;