import * as tasksRepo from './task.repository';
import { ITask } from '../../entities/task';

export const getAll = async (boardId: string): Promise<ITask[]> =>
  tasksRepo.getAll(boardId);

export const getById = async (boardId: string, id: string): Promise<ITask> =>
  tasksRepo.getById(boardId, id);

export const create = async (
  boardId: string,
  dto: Partial<ITask>
): Promise<ITask> => tasksRepo.create(boardId, dto);

export const update = async (
  boardId: string,
  id: string,
  dto: Partial<ITask>
): Promise<ITask> => tasksRepo.update(boardId, id, dto);

export const remove = async (boardId: string, id: string): Promise<void> =>
  tasksRepo.remove(boardId, id);
