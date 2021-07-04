import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//
import { BoardColumn } from './board-column.entity';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 128 })
  title!: string;

  @Column('json')
  columns!: BoardColumn[];
}
