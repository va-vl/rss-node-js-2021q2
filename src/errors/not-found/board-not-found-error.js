const EntityNotFoundError = require('./entity-not-found-error');

/**
 * Class representing BoardNotFoundError
 * @description Thrown when board was not found in db
 * @augments EntityNotFoundError
 */
class BoardNotFoundError extends EntityNotFoundError {
  /**
   * @param {String} id board id
   */
  constructor(id) {
    super('Board', id);
  }
}

module.exports = BoardNotFoundError;
