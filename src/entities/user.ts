import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//
import { IUser } from '../common/types';

@Entity('user')
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { length: 128 })
  name = 'Default Name';

  @Column('varchar', { length: 128 })
  login = 'defaultlogin';

  @Column('varchar', { length: 128 })
  password = 'defaultpassword1';
}

export default User;
