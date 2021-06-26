import * as tasksRepo from './task.repository';
import Task from '../../entities/task';
import { TaskDTO } from '../../common/types';

export const getAll = async (boardId: string): Promise<Task[]> =>
  tasksRepo.getAll(boardId);

export const getById = async (boardId: string, id: string): Promise<Task> =>
  tasksRepo.getById(boardId, id);

export const create = async (boardId: string, dto: TaskDTO): Promise<Task> =>
  tasksRepo.create(boardId, dto);

export const update = async (
  boardId: string,
  id: string,
  dto: TaskDTO
): Promise<Task> => tasksRepo.update(boardId, id, dto);

export const remove = async (boardId: string, id: string): Promise<void> =>
  tasksRepo.remove(boardId, id);
