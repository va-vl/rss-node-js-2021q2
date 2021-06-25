import { getRepository } from 'typeorm';
//
import { Task, ITask } from '../../entities/task';
import { EntityNotFoundError } from '../../errors';

export const getAll = async (boardId: string): Promise<ITask[]> => {
  const taskRepository = getRepository(Task);
  return taskRepository.find({ where: { boardId }, loadRelationIds: true });
};

export const getById = async (boardId: string, id: string): Promise<ITask> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(id, {
    where: { boardId },
    loadRelationIds: true,
  });

  if (task === undefined) {
    throw new EntityNotFoundError('Task', id, { boardId });
  }

  return task;
};

export const create = async (
  boardId: string,
  dto: Partial<ITask>
): Promise<ITask> => {
  const taskRepository = getRepository(Task);
  const task = taskRepository.create({ ...dto, boardId });
  await taskRepository.save(task);
  return getById(boardId, task.id);
};

export const update = async (
  boardId: string,
  id: string,
  dto: Partial<ITask>
): Promise<ITask> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne(id, {
    where: { boardId },
  });

  if (task === undefined) {
    throw new EntityNotFoundError('Task', id, { boardId });
  }

  return taskRepository.save({ ...task, ...dto });
};

export const remove = async (boardId: string, id: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  await taskRepository.delete({ boardId, id });
};
