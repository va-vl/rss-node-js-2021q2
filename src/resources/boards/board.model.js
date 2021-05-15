const uuid = require('uuid');
// 
const Column = require('./board.column.model');

class Board {
  /**
   * @param {Object} params 
   * @param {String} params.id
   * @param {String} params.title
   * @param {<Column>} params.columns
   */
  constructor({
    id = uuid.v4(),
    title = 'Board Title',
    columns = [
      new Column()
    ],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;