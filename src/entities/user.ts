import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as uuid from 'uuid';
//
import { IUser, UserDTO } from '../common/types';

@Entity()
class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  login: string;

  @Column({ length: 50 })
  password: string;

  constructor({
    name = 'Default User',
    login = 'defaultUserName',
    password = 'defaultUserPassword',
  }: UserDTO = {}) {
    this.id = uuid.v4();
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

export default User;
