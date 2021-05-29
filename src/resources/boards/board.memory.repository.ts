import * as DB from  '../../db/db.memory';
import IBoardProps from  './board.types';
import Board from  './board.model';
import { BoardNotFoundError } from  '../../errors';

const getAll = async (): Promise<Board[]> => DB.getAllBoards();

const getById = async (id: string): Promise<Board> => {
  const board = await DB.getBoardById(id);

  if (board === undefined) {
    throw new BoardNotFoundError(id);
  }

  return board;
};

const create = async (props: IBoardProps): Promise<Board> => DB.createBoard(props);

const update = async (
  id: string, 
  props: IBoardProps
): Promise<Board> => {
  const board = await DB.updateBoard(id, props);

  if (board === undefined) {
    throw new BoardNotFoundError(id);
  }

  return board;
};

const remove = async (id: string): Promise<void> => {
  const isRemoved = await DB.removeBoard(id);

  if (isRemoved === false) {
    throw new BoardNotFoundError(id);
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
