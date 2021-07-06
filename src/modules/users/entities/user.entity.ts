import { Expose } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
//
import { config } from './../../../common';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id!: string;

  @Column('varchar')
  @Expose()
  name!: string;

  @Column('varchar', { unique: true })
  @Expose()
  login!: string;

  @Column('varchar')
  password!: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(password: string) {
    const rounds = config().JWT_SALT_ROUNDS;
    const salt = await bcrypt.genSalt(rounds);
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
