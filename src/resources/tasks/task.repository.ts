import { getRepository } from 'typeorm';
//
import Task from '../../entities/task';
import { TaskDTO } from '../../common/types';
import { EntityNotFoundError } from '../../errors';

const getTaskRepository = () => getRepository(Task);

export const getAll = async (boardId: string): Promise<Task[]> => {
  const taskRepository = getTaskRepository();
  return taskRepository.find({ where: { boardId } });
};

export const getById = async (boardId: string, id: string): Promise<Task> => {
  const taskRepository = getTaskRepository();
  const task = await taskRepository.findOne(id, {
    where: { boardId },
    loadRelationIds: true,
  });

  if (task === undefined) {
    throw new EntityNotFoundError('Task', id, { boardId });
  }

  return task;
};

export const create = async (boardId: string, dto: TaskDTO): Promise<Task> => {
  const taskRepository = getTaskRepository();
  const task = taskRepository.create({ ...dto, boardId });
  await taskRepository.save(task);
  return getById(boardId, task.id);
};

export const update = async (
  boardId: string,
  id: string,
  dto: TaskDTO
): Promise<Task> => {
  const taskRepository = getTaskRepository();
  const task = await taskRepository.findOne(id, {
    where: { boardId },
  });

  if (task === undefined) {
    throw new EntityNotFoundError('Task', id, { boardId });
  }

  return taskRepository.save({ ...task, ...dto });
};

export const remove = async (boardId: string, id: string): Promise<void> => {
  const taskRepository = getTaskRepository();
  await taskRepository.delete({ boardId, id });
};
