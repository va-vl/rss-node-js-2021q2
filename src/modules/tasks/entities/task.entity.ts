import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Generated,
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

  @Column()
  title!: string;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userId' })
  userId!: string | null;

  @ManyToOne(() => Board, (board) => board.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  boardId!: string;

  @OneToOne(() => BoardColumn, (boardColumn) => boardColumn.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'columnId' })
  columnId!: string | null;

  @Generated('increment')
  order!: number;
}
