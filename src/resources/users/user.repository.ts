import { getRepository } from 'typeorm';
//
import { User, IUser } from '../../entities/user';
import { EntityNotFoundError } from '../../errors';

const getUserRepository = () => getRepository(User);

export const getAll = async (): Promise<IUser[]> => {
  const userRepository = getUserRepository();
  return userRepository.find();
};

export const getById = async (id: string): Promise<IUser> => {
  const userRepository = getUserRepository();
  const user = await userRepository.findOne(id);

  if (user === undefined) {
    throw new EntityNotFoundError('User', id);
  }

  return user;
};

export const create = async (dto: Partial<IUser>): Promise<IUser> => {
  const userRepository = getUserRepository();
  const user = userRepository.create(dto);
  await userRepository.save(user);
  return getById(user.id);
};

export const update = async (
  id: string,
  dto: Partial<IUser>
): Promise<IUser> => {
  const userRepository = getUserRepository();
  const user = await userRepository.findOne(id);

  if (user === undefined) {
    throw new EntityNotFoundError('User', id);
  }

  await userRepository.update(id, dto);
  return getById(id);
};

export const remove = async (id: string): Promise<void> => {
  const userRepository = getUserRepository();
  await userRepository.delete({ id });
};
