const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = "Task Title",
    order = 0,
    description = "A default task description",
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  updateTask({
    id, 
    title, 
    order, 
    description, 
    userId, 
    boardId, 
    columnId
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;