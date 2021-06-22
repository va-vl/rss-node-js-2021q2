import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface IColumn {
  id: string;
  title?: string;
  order?: number;
}

export interface IBoard {
  id: string;
  title?: string;
  columns?: IColumn[];
}

@Entity('board')
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 128 })
  title = 'Default Board Title';

  @Column('json')
  columns: IColumn[] = [];
}
