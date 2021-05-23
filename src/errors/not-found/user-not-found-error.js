const EntityNotFoundError = require('./entity-not-found-error');

class UserNotFoundError extends EntityNotFoundError {
  /**
   * @param {String} id
   */
  constructor(id) {
    super('User', id);
  }
}

module.exports = UserNotFoundError;
