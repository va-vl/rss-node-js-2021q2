import { getRepository } from 'typeorm';
//
import { Board } from '../../entities/board';

export const getAll = async (): Promise<Board[]> => getRepository(Board).find();

export const getById = async (id: string): Promise<Board> =>
  getRepository(Board).findOneOrFail({ where: { id } });

export const create = async (dto: Partial<Board>): Promise<Board> => {
  const boardRepository = getRepository(Board);
  return boardRepository.save(boardRepository.create(dto));
};

export const update = async (
  id: string,
  dto: Partial<Board>
): Promise<Board> => {
  const board = await getById(id);
  return getRepository(Board).save({ ...board, ...dto });
};

export const remove = async (id: string): Promise<void> => {
  const boardRepository = getRepository(Board);
  await boardRepository.delete({ id });
};
