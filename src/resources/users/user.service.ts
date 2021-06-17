import * as usersRepo from './user.repository';
import User from '../../entities/user';
import { UserDTO } from '../../common/types';

export const getAll = async (): Promise<User[]> => usersRepo.getAll();

export const getById = async (id: string): Promise<User> =>
  usersRepo.getById(id);

export const create = async (dto: UserDTO): Promise<User> =>
  usersRepo.create(dto);

export const update = async (id: string, dto: UserDTO): Promise<User> =>
  usersRepo.update(id, dto);

export const remove = async (id: string): Promise<void> => usersRepo.remove(id);
