const uuid = require('uuid');

class Task {
  /**
   * @param {Object} params
   * @param {String} params.id
   * @param {String} params.title
   * @param {String} params.description
   * @param {String|null} params.userId
   * @param {String|null} params.boardId
   * @param {String|null} params.columnId
   * @param {Number} params.order
   */
  constructor({
    id = uuid.v4(),
    title = 'Task Title',
    description = 'A default task description',
    userId = null,
    boardId = null,
    columnId = null,
    order = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.order = order;
  }

  /**
   * @param {Object} task
   * @returns {Task}
   */
  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;

    return {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
  }
}

module.exports = Task;
