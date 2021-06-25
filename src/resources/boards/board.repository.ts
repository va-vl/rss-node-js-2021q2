import { getRepository } from 'typeorm';
//
import { Board } from '../../entities/board';
import { EntityNotFoundError } from '../../errors';

export const getAll = async (): Promise<Board[]> => {
  const boardRepository = getRepository(Board);
  return boardRepository.find();
};

export const getById = async (id: string): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);

  if (board === undefined) {
    throw new EntityNotFoundError('Board', id);
  }

  return board;
};

export const create = async (dto: Partial<Board>): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const board = boardRepository.create(dto);
  await boardRepository.save(board);
  return getById(board.id);
};

export const update = async (
  id: string,
  dto: Partial<Board>
): Promise<Board> => {
  const boardRepository = getRepository(Board);
  const board = await boardRepository.findOne(id);

  if (board === undefined) {
    throw new EntityNotFoundError('Board', id);
  }

  return boardRepository.save({ ...board, ...dto });
};

export const remove = async (id: string): Promise<void> => {
  const boardRepository = getRepository(Board);
  await boardRepository.delete({ id });
};
