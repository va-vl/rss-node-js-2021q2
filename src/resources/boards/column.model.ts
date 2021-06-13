import * as uuid from 'uuid';
//
import { IColumnProps } from './board.types';

class Column {
  id: string;
  title: string;
  order: number;

  constructor({
    id = uuid.v4(),
    title = 'Column Title',
    order = 0,
  }: IColumnProps = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

export default Column;
