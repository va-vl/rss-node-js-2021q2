import DB = require('../../db/db.memory');
import User = require('./user.model');
import IUserProps = require('./user.types');
import errors = require('../../errors');

const { UserNotFoundError } = errors;

const getAll = async (): Promise<User[]> => DB.getAllUsers();

const getById = async (id: string): Promise<User> => {
  const user = await DB.getUserById(id);

  if (user === undefined) {
    throw new UserNotFoundError(id);
  }

  return user;
};

const create = async (props: IUserProps): Promise<User> => DB.createUser(props);

const update = async (
  id: string, 
  props: IUserProps
): Promise<User> => {
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

export = {
  getAll,
  getById,
  create,
  update,
  remove,
};
