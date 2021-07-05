import {
  IsString,
  Length,
  IsOptional,
  IsUUID,
  IsNumber,
} from 'class-validator';

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

  @IsOptional()
  @IsUUID()
  boardId!: string;

  @IsOptional()
  @IsUUID()
  columnId!: string;

  @IsNumber()
  order!: number;
}
