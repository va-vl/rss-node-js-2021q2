import * as boardsRepo from './board.repository';
import { IBoard } from '../../entities/board';

export const getAll = async (): Promise<IBoard[]> => boardsRepo.getAll();

export const getById = async (id: string): Promise<IBoard> =>
  boardsRepo.getById(id);

export const create = async (dto: Partial<IBoard>): Promise<IBoard> =>
  boardsRepo.create(dto);

export const update = async (
  id: string,
  dto: Partial<IBoard>
): Promise<IBoard> => boardsRepo.update(id, dto);

export const remove = async (id: string): Promise<void> =>
  boardsRepo.remove(id);
