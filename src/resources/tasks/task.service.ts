import tasksRepo from './task.memory.repository';
import Task from './task.model';
import { ITaskProps } from './task.types';

const getAll = async (boardId: string): Promise<Task[]> =>
  tasksRepo.getAll(boardId);

const getById = async (boardId: string, id: string): Promise<Task> =>
  tasksRepo.getById(boardId, id);

const create = async (boardId: string, props: ITaskProps): Promise<Task> =>
  tasksRepo.create(boardId, props);

const update = async (
  boardId: string,
  id: string,
  props: ITaskProps
): Promise<Task> => tasksRepo.update(boardId, id, props);

const remove = async (boardId: string, id: string): Promise<void> => {
  tasksRepo.remove(boardId, id);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
