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
//
import { JwtGuard } from 'src/guards/jwt.guard';
import { BoardService } from './board.service';
import { BoardId } from './input/board-id.input';
import { CreateBoardDTO } from './input/create-board';
import { UpdateBoardDTO } from './input/update-board';

@Controller('boards')
@UseGuards(JwtGuard)
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
      throw new NotFoundException(`Board ${input.id} not found`);
    }

    return board;
  }

  @Post()
  async create(@Body() createBoardDTO: CreateBoardDTO) {
    let board;

    try {
      board = await this.boardService.create(createBoardDTO);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }

    return board;
  }

  @Put(':id')
  async update(
    @Param() input: BoardId,
    @Body() updateBoardDTO: UpdateBoardDTO,
  ) {
    const board = await this.boardService.update(input.id, updateBoardDTO);

    if (board === undefined) {
      throw new NotFoundException(`Board ${input.id} not found`);
    }

    return board;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() input: BoardId) {
    const isBoardRemoved = await this.boardService.remove(input.id);

    if (!isBoardRemoved) {
      throw new NotFoundException(`Board ${input.id} not found`);
    }
  }
}
