const EntityNotFoundError = require('./entity-not-found-error');

/**
 * Class representing TaskNotFoundError error
 * @description Thrown when Task was not found
 * @augments EntityNotFoundError
 */
class TaskNotFoundError extends EntityNotFoundError {
  /**
   * @param {String} id - task id
   * @param {String} boardId - id of a board the task was supposed to be on
   */
  constructor(id, boardId) {
    super();
    this.message = `Error: Task with id ${id} on Board ${boardId} not found!`;
  }
}

module.exports = TaskNotFoundError;
