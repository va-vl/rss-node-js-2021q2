import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  id: string;
  name?: string;
  login?: string;
  password?: string;
}

@Entity('user')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 128 })
  name = 'Default Name';

  @Column('varchar', { unique: true, length: 128 })
  login = 'defaultlogin';

  @Column('text')
  password!: string;
}
