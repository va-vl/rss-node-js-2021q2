import { IsOptional, IsUUID } from 'class-validator';

export class TaskID {
  @IsOptional()
  @IsUUID('4')
  id!: string;

  @IsUUID('4')
  boardId!: string;
}
