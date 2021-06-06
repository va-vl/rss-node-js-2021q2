import boardsRepo from './board.memory.repository';
import Board from './board.model';
import IBoardProps from './board.types';

const getAll = async (): Promise<Board[]> => boardsRepo.getAll();

const getById = async (id: string): Promise<Board> => boardsRepo.getById(id);

const create = async (props: IBoardProps): Promise<Board> =>
  boardsRepo.create(props);

const update = async (id: string, props: IBoardProps): Promise<Board> =>
  boardsRepo.update(id, props);

const remove = async (id: string): Promise<void> => {
  await boardsRepo.remove(id);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
