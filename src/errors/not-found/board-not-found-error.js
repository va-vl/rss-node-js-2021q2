const EntityNotFoundError = require('./entity-not-found-error');

class BoardNotFoundError extends EntityNotFoundError {
  /**
   * @param {String} id
   */
  constructor(id) {
    super('Board', id);
  }
}

module.exports = BoardNotFoundError;
