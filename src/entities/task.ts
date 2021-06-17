import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import * as uuid from 'uuid';
//
import { ITask, TaskDTO } from '../common/types';
import User from './user';
import Board from './board';

@Entity()
class Task implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 140 })
  description: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user!: User;

  @Column({ nullable: true })
  userId: string | null;

  @ManyToOne(() => Board, { onDelete: 'CASCADE' })
  board!: Board;

  @Column({ nullable: true })
  boardId: string | null;

  @Column({ nullable: true })
  columnId: string | null;

  @Column('integer')
  order: number;

  constructor({
    title = 'Default Task',
    description = 'Default Task Description',
    userId = null,
    boardId = null,
    columnId = null,
    order = 0,
  }: TaskDTO = {}) {
    this.id = uuid.v4();
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.order = order;
  }
}

export default Task;
