import { getRepository } from 'typeorm';
//
import { Task, ITask } from '../../entities/task';

export const getAll = async (boardId: string): Promise<ITask[]> =>
  getRepository(Task).find({ where: { boardId }, loadRelationIds: true });

export const getById = async (boardId: string, id: string): Promise<ITask> =>
  getRepository(Task).findOneOrFail({
    where: { boardId, id },
    loadRelationIds: true,
  });

export const create = async (
  boardId: string,
  dto: Partial<ITask>
): Promise<ITask> => {
  const taskRepository = getRepository(Task);
  return taskRepository.save(taskRepository.create({ ...dto, boardId }));
};

export const update = async (
  boardId: string,
  id: string,
  dto: Partial<ITask>
): Promise<ITask> => {
  const task = await getById(boardId, id);
  return getRepository(Task).save({ ...task, ...dto });
};

export const remove = async (boardId: string, id: string): Promise<void> => {
  const taskRepository = getRepository(Task);
  await taskRepository.delete({ boardId, id });
};
