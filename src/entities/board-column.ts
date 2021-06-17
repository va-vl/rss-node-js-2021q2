import * as uuid from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//
import { IColumn } from '../common/types';

@Entity()
class BoardColumn implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column('integer')
  order: number;

  constructor({ title = 'Column Title', order = 0 } = {}) {
    this.id = uuid.v4();
    this.title = title;
    this.order = order;
  }
}

export default BoardColumn;
