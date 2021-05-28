import uuid = require('uuid');
// 
import IColumnProps = require('./column.types');

class Column {
  id: string;
  title: string;
  order: number;

  constructor({ 
    id = uuid.v4(), 
    title = 'Column Title', 
    order = 0 
  }: IColumnProps = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export = Column;
