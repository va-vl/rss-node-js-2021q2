import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';
//
import BoardColumn from './board-column';
import { IBoard, BoardDTO } from '../common/types';

@Entity()
class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column('jsonb')
  columns: BoardColumn[];

  constructor({
    title = 'Board Title',
    columns = [new BoardColumn()],
  }: BoardDTO = {}) {
    this.id = uuid.v4();
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
