import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
