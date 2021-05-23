const EntityNotFoundError = require('./entity-not-found-error');

/**
 * Class representing BoardNotFoundError
 * @description Thrown when Board was not found
 * @augments EntityNotFoundError
 */
class BoardNotFoundError extends EntityNotFoundError {
  /**
   * @param {String} id - Board id
   */
  constructor(id) {
    super('Board', id);
  }
}

module.exports = BoardNotFoundError;
