import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//
import { IUser } from '../common/types';

@Entity('user')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 128 })
  name!: string;

  @Column('varchar', { length: 128 })
  login!: string;

  @Column('varchar', { length: 128 })
  password!: string;
}

export default User;
