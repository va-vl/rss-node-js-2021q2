const uuid = require('uuid');

class Column {
  /**
   * @param {Object} params
   * @param {String} params.id
   * @param {Title} params.title
   * @param {Number} params.order 
   */
  constructor({
    id = uuid.v4(),
    title = "Column Title",
    order = 0,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.tasks = [];
  }

  /**
   * @param {Object} task 
   */
  addTask(task) {
    this.tasks.push(task);
  }

  /**
   * @param {String} taskId 
   */
  removeTaskById(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}

module.exports = Column;