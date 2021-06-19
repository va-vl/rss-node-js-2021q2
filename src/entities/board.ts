import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//
import { IBoard, IColumn } from '../common/types';

@Entity()
class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 128 })
  title!: string;

  @Column('json')
  columns!: IColumn[];
}

export default Board;
