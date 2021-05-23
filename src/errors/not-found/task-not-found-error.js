class TaskNotFoundError extends Error {
  /**
   * @param {String} id
   * @param {String} boardId
   */
  constructor(id, boardId) {
    super();
    this.message = `Error: Task with id ${id} on Board ${boardId} not found!`;
    this.name = 'TaskNotFoundError';
    this.code = 'ERR_ENTITY_NOT_FOUND';
  }
}

module.exports = TaskNotFoundError;
