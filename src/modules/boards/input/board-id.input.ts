import { IsUUID } from 'class-validator';

export class BoardId {
  @IsUUID('4')
  id!: string;
}
