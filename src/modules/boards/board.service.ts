import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//
import { Board } from './entities/board.entity';
import { CreateBoardDTO } from './input/create-board';
import { UpdateBoardDTO } from './input/update-board';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getAll() {
    return this.boardRepository.find();
  }

  async getById(id: string) {
    return this.boardRepository.findOne({ where: { id } });
  }

  async create(createBoardDTO: CreateBoardDTO) {
    return this.boardRepository.save(
      this.boardRepository.create(createBoardDTO),
    );
  }

  async update(id: string, updateBoardDTO: UpdateBoardDTO) {
    const board = await this.getById(id);
    return board && this.boardRepository.save({ ...board, ...updateBoardDTO });
  }

  async remove(id: string) {
    const board = await this.getById(id);

    if (board) {
      await this.boardRepository.remove(board);
      return true;
    }

    return false;
  }
}
