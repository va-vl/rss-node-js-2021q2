import { getRepository } from 'typeorm';
//
import { Board } from '../../entities/board';
import { EntityNotFoundError } from '../../errors';

const getBoardRepository = () => getRepository(Board);

export const getAll = async (): Promise<Board[]> => {
  const boardRepository = getBoardRepository();
  return boardRepository.find();
};

export const getById = async (id: string): Promise<Board> => {
  const boardRepository = getBoardRepository();
  const board = await boardRepository.findOne(id);

  if (board === undefined) {
    throw new EntityNotFoundError('Board', id);
  }

  return board;
};

export const create = async (dto: Partial<Board>): Promise<Board> => {
  const boardRepository = getBoardRepository();
  const board = boardRepository.create(dto);
  await boardRepository.save(board);
  return getById(board.id);
};

export const update = async (
  id: string,
  dto: Partial<Board>
): Promise<Board> => {
  const boardRepository = getBoardRepository();
  const board = await boardRepository.findOne(id);

  if (board === undefined) {
    throw new EntityNotFoundError('Board', id);
  }

  return boardRepository.save({ ...board, ...dto });
};

export const remove = async (id: string): Promise<void> => {
  const boardRepository = getBoardRepository();
  await boardRepository.delete({ id });
};
