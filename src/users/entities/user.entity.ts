import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id!: string;

  @Column()
  @Expose()
  name!: string;

  @Column({ unique: true })
  @Expose()
  login!: string;

  @Column()
  password!: string;
}
