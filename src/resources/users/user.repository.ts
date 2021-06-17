import { getRepository } from 'typeorm';
//
import User from '../../entities/user';
import { UserDTO } from '../../common/types';
import { EntityNotFoundError } from '../../errors';

const getUserRepository = () => getRepository(User);
const columnsToResponse: (keyof User)[] = ['id', 'login', 'name'];

export const getAll = async (): Promise<User[]> => {
  const userRepository = getUserRepository();
  return userRepository.find({ select: columnsToResponse });
};

export const getById = async (id: string): Promise<User> => {
  const userRepository = getUserRepository();
  const user = await userRepository.findOne(id, { select: columnsToResponse });

  if (user === undefined) {
    throw new EntityNotFoundError('User', id);
  }

  return user;
};

export const create = async (dto: UserDTO): Promise<User> => {
  const userRepository = getUserRepository();
  return getRepository(User).save(userRepository.create(dto));
};

export const update = async (id: string, dto: UserDTO): Promise<User> => {
  const userRepository = getUserRepository();
  const user = await userRepository.findOne(id);

  if (user === undefined) {
    throw new EntityNotFoundError('User', id);
  }

  return userRepository.save({ ...user, ...dto });
};

export const remove = async (id: string): Promise<void> => {
  const userRepository = getUserRepository();
  await userRepository.delete({ id });
};
