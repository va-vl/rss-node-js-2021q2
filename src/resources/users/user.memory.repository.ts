import * as DB from '../../db/db.memory';
import User from './user.model';
import { IUserProps } from './user.types';

const getAll = async (): Promise<User[]> => DB.getAllUsers();

const getById = async (id: string): Promise<User> => DB.getUserById(id);

const create = async (props: IUserProps): Promise<User> => DB.createUser(props);

const update = async (id: string, props: IUserProps): Promise<User> =>
  DB.updateUser(id, props);

const remove = async (id: string): Promise<true> => DB.removeUser(id);

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
