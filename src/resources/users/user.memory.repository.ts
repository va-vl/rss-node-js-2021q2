import { getRepository } from 'typeorm';
//
import User from '../../entities/user';
import { UserDTO } from '../../common/types';
import { EntityNotFoundError } from '../../errors';

const repository = getRepository(User);
const columnsToResponse: (keyof User)[] = ['id', 'login', 'name'];

export const getAll = async (): Promise<User[]> =>
  repository.find({ select: columnsToResponse });

export const getById = async (id: string): Promise<User> => {
  const user = await repository.findOne(id, { select: columnsToResponse });

  if (user === undefined) {
    throw new EntityNotFoundError('User', id);
  }

  return user;
};

export const create = async (dto: UserDTO): Promise<User> =>
  repository.save(repository.create(dto));

export const update = async (id: string, dto: UserDTO): Promise<User> => {
  const user = await repository.findOne(id);

  if (user === undefined) {
    throw new EntityNotFoundError('User', id);
  }

  return repository.save({ ...user, ...dto });
};

export const remove = async (id: string): Promise<void> => {
  await repository.delete({ id });
};
