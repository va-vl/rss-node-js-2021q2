import * as DB from '../../db/db.memory';
import { IBoardProps } from './board.types';
import Board from './board.model';

const getAll = async (): Promise<Board[]> => DB.getAllBoards();

const getById = async (id: string): Promise<Board> => DB.getBoardById(id);

const create = async (props: IBoardProps): Promise<Board> =>
  DB.createBoard(props);

const update = async (id: string, props: IBoardProps): Promise<Board> =>
  DB.updateBoard(id, props);

const remove = async (id: string): Promise<void> => DB.removeBoard(id);

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
