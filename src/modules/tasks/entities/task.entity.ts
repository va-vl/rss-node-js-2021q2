import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
//
import { User } from 'src/modules/users/entities/user.entity';
import { Board } from 'src/modules/boards/entities/board.entity';
import { BoardColumn } from 'src/modules/boards/entities/board-column.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title!: string;

  @Column('varchar')
  description!: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  userId!: string | null;

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  boardId!: string | null;

  @OneToOne(() => BoardColumn, (boardColumn) => boardColumn.id, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'columnId' })
  columnId!: string | null;

  @Column('integer')
  order!: number;
}
