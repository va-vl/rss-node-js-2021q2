import * as DB from '../../db/db.memory';
import Task from './task.model';
import ITaskProps from './task.types';
import { TaskNotFoundError } from '../../errors';

const getAll = async (boardId: string): Promise<Task[]> =>
  DB.getAllTasks(boardId);

const getById = async (boardId: string, id: string): Promise<Task> => {
  const task = await DB.getTaskById(boardId, id);

  if (task === undefined) {
    throw new TaskNotFoundError(id, boardId);
  }

  return task;
};

const create = async (boardId: string, props: ITaskProps): Promise<Task> =>
  DB.createTask(boardId, props);

const update = async (
  boardId: string,
  id: string,
  props: ITaskProps
): Promise<Task> => {
  const updatedTask = await DB.updateTask(boardId, id, props);

  if (updatedTask === undefined) {
    throw new TaskNotFoundError(id, boardId);
  }

  return updatedTask;
};

const remove = async (boardId: string, id: string): Promise<void> => {
  const isRemoved = await DB.removeTask(boardId, id);

  if (!isRemoved) {
    throw new TaskNotFoundError(id, boardId);
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
