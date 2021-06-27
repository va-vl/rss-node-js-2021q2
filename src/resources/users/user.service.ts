import * as usersRepo from './user.repository';
import * as utils from '../../utils';
import { IUser } from '../../entities/user';

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

export const create = async (dto: Partial<IUser>): Promise<IUser> => {
  let passwordHash;

  if (dto.password !== undefined) {
    passwordHash = await utils.encryptor.hashPassword(dto.password);
  }

  const user = await usersRepo.create({ ...dto, password: passwordHash });
  return filterPassword(user);
};

export const update = async (
  id: string,
  dto: Partial<IUser>
): Promise<IUser> => {
  let passwordHash;

  if (dto.password !== undefined) {
    passwordHash = await utils.encryptor.hashPassword(dto.password);
  }

  const user = await usersRepo.update(id, { ...dto, password: passwordHash });
  return filterPassword(user);
};

export const remove = async (id: string): Promise<void> => usersRepo.remove(id);
