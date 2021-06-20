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

@Entity('task')
class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 128 })
  title = 'Default Task Title';

  @Column('varchar', { length: 512 })
  description = 'Default Task Description';

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  userId: string | null = null;

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  boardId: string | null = null;

  @Column('text', { nullable: true })
  columnId: string | null = null;

  @Column('integer')
  order = 0;
}

export default Task;
