import { IsString, Length, IsOptional, IsUUID } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @Length(6, 255)
  title = 'Default Task Title';

  @IsString()
  @Length(6, 255)
  description = 'Default Task Description';

  @IsOptional()
  @IsUUID('4')
  userId!: string;

  @IsUUID()
  boardId!: string;

  @IsOptional()
  @IsUUID()
  columnId!: string;
}
