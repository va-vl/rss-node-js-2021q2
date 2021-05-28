import uuid = require('uuid');
//
import Column = require('./column.model');
import IBoardProps = require('./board.types');

class Board {
  id: string;
  title: string;
  columns: Column[];

  constructor({
    id = uuid.v4(),
    title = 'Board Title',
    columns = [new Column()],
  }: IBoardProps = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export = Board;
