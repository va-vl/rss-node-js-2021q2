import usersRepo from './user.memory.repository';
import User from './user.model';
import IUserProps from './user.types';

const getAll = async (): Promise<User[]> => usersRepo.getAll();

const getById = async (id: string): Promise<User> => usersRepo.getById(id);

const create = async (props: IUserProps): Promise<User> =>
  usersRepo.create(props);

const update = async (id: string, props: IUserProps): Promise<User> =>
  usersRepo.update(id, props);

const remove = async (id: string): Promise<void> => {
  await usersRepo.remove(id);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
