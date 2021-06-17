import { getRepository } from 'typeorm';
//
import Task from '../../entities/task';
import { TaskDTO } from '../../common/types';
import { EntityNotFoundError } from '../../errors';

const repository = getRepository(Task);

export const getAll = async (boardId: string): Promise<Task[]> =>
  repository.find({ where: { boardId } });

export const getById = async (boardId: string, id: string): Promise<Task> => {
  const task = await repository.findOne(id, { where: boardId });

  if (task === undefined) {
    throw new EntityNotFoundError('Task', id, { boardId });
  }

  return task;
};

export const create = async (boardId: string, dto: TaskDTO): Promise<Task> =>
  repository.save(repository.create({ ...dto, boardId }));

export const update = async (
  boardId: string,
  id: string,
  dto: TaskDTO
): Promise<Task> => {
  const task = await repository.findOne(id, { where: boardId });

  if (task === undefined) {
    throw new EntityNotFoundError('Task', id, { boardId });
  }

  return repository.save({ ...task, ...dto });
};

export const remove = async (boardId: string, id: string): Promise<void> => {
  await repository.delete({ boardId, id });
};
