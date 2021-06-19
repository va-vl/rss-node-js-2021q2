import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
//
import { ITask } from '../common/types';
import User from './user';
import Board from './board';

@Entity()
class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 128 })
  title!: string;

  @Column('varchar', { length: 512 })
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

  @Column({ nullable: true })
  columnId!: string | null;

  @Column('integer')
  order!: number;
}

export default Task;
