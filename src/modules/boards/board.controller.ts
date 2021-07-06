import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//
import { BoardService } from './board.service';
import { BoardId } from './input/board-id.input';
import { CreateBoardDTO } from './input/create-board';
import { UpdateBoardDTO } from './input/update-board';

@Controller('boards')
@UseGuards(AuthGuard('jwt'))
export class BoardController {
  constructor(
    @Inject(BoardService)
    private readonly boardService: BoardService,
  ) {}

  @Get()
  async getAll() {
    return this.boardService.getAll();
  }

  @Get(':id')
  async getById(@Param() input: BoardId) {
    const board = await this.boardService.getById(input.id);

    if (board === undefined) {
      throw new NotFoundException();
    }

    return board;
  }

  @Post()
  async create(@Body() createBoardDTO: CreateBoardDTO) {
    let board;

    try {
      board = await this.boardService.create(createBoardDTO);
    } catch {
      throw new InternalServerErrorException();
    }

    return board;
  }

  @Put(':id')
  async update(
    @Param() input: BoardId,
    @Body() updateBoardDTO: UpdateBoardDTO,
  ) {
    return this.boardService.update(input.id, updateBoardDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() input: BoardId) {
    const isBoardRemoved = await this.boardService.remove(input.id);

    if (!isBoardRemoved) {
      throw new NotFoundException();
    }
  }
}
