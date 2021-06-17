import * as boardsRepo from './board.repository';
import Board from '../../entities/board';
import { BoardDTO } from '../../common/types';

export const getAll = async (): Promise<Board[]> => boardsRepo.getAll();

export const getById = async (id: string): Promise<Board> =>
  boardsRepo.getById(id);

export const create = async (dto: BoardDTO): Promise<Board> =>
  boardsRepo.create(dto);

export const update = async (id: string, dto: BoardDTO): Promise<Board> =>
  boardsRepo.update(id, dto);

export const remove = async (id: string): Promise<void> =>
  boardsRepo.remove(id);
