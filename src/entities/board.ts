import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//
import { IBoard, IColumn } from '../common/types';

@Entity('board')
class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 128 })
  title = 'Default Board Title';

  @Column('json')
  columns: IColumn[] = [];
}

export default Board;
