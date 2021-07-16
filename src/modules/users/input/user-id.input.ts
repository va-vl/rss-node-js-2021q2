import { IsUUID } from 'class-validator';

export class UserID {
  @IsUUID('4')
  readonly id!: string;
}
