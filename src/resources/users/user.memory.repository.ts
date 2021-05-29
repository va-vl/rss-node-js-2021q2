import * as DB from '../../db/db.memory';
import User from './user.model';
import IUserProps from './user.types';
import { UserNotFoundError } from '../../errors';

const getAll = async (): Promise<User[]> => DB.getAllUsers();

const getById = async (id: string): Promise<User> => {
  const user = await DB.getUserById(id);

  if (user === undefined) {
    throw new UserNotFoundError(id);
  }

  return user;
};

const create = async (props: IUserProps): Promise<User> => DB.createUser(props);

const update = async (id: string, props: IUserProps): Promise<User> => {
  const user = await DB.updateUser(id, props);

  if (user === undefined) {
    throw new UserNotFoundError(id);
  }

  return user;
};

const remove = async (id: string): Promise<void> => {
  const isRemoved = await DB.removeUser(id);

  if (isRemoved === false) {
    throw new UserNotFoundError(id);
  }
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
