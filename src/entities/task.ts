import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
//
import { User } from './user';
import { Board } from './board';

export interface ITask {
  id: string;
  title?: string;
  description?: string;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
  order?: number;
}

@Entity('task')
export class Task implements ITask {
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
