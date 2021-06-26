import * as usersRepo from './user.repository';
import { IUser, UserDTO } from '../../common/types';

const filterPassword = (user: IUser): IUser => ({
  id: user.id,
  name: user.name,
  login: user.login,
});

export const getAll = async (): Promise<IUser[]> => {
  const users = await usersRepo.getAll();
  return users.map(filterPassword);
};

export const getById = async (id: string): Promise<IUser> => {
  const user = await usersRepo.getById(id);
  return filterPassword(user);
};

export const create = async (dto: UserDTO): Promise<IUser> => {
  const user = await usersRepo.create(dto);
  return filterPassword(user);
};

export const update = async (id: string, dto: UserDTO): Promise<IUser> => {
  const user = await usersRepo.update(id, dto);
  return filterPassword(user);
};

export const remove = async (id: string): Promise<void> => usersRepo.remove(id);
