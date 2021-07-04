import { PartialType } from '@nestjs/mapped-types';
//
import { CreateBoardDTO } from './create-board';

export class UpdateBoardDTO extends PartialType(CreateBoardDTO) {}
