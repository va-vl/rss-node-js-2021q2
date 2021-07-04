import { IsArray, IsString, Length } from 'class-validator';
import { BoardColumn } from '../entities/board-column.entity';

export class CreateBoardDTO {
  @IsString()
  @Length(6, 128)
  title = 'Default Board Title';

  @IsArray()
  columns!: BoardColumn[];
}
