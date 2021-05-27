const EntityNotFoundError = require('./entity-not-found-error');

/**
 * Class representing UserNotFoundError error
 * @description Thrown when User was not found
 * @augments EntityNotFoundError
 */
class UserNotFoundError extends EntityNotFoundError {
  /**
   * @param {String} id user id
   */
  constructor(id) {
    super('User', id);
  }
}

module.exports = UserNotFoundError;
