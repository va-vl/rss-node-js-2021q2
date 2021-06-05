import * as DB from '../../db/db.memory';
import Task from './task.model';
import { ITaskProps } from './task.types';

const getAll = async (boardId: string): Promise<Task[]> =>
  DB.getAllTasks(boardId);

const getById = async (boardId: string, id: string): Promise<Task> =>
  DB.getTaskById(boardId, id);

const create = async (boardId: string, props: ITaskProps): Promise<Task> =>
  DB.createTask(boardId, props);

const update = async (
  boardId: string,
  id: string,
  props: ITaskProps
): Promise<Task> => DB.updateTask(boardId, id, props);

const remove = async (boardId: string, id: string): Promise<void> =>
  DB.removeTask(boardId, id);

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
