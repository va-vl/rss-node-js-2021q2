import usersRepo = require('./user.memory.repository');
import User = require('./user.model');
import IUserProps = require('./user.types');

const getAll = async (): Promise<User[]> => usersRepo.getAll();

const getById = async (id: string): Promise<User> => usersRepo.getById(id);

const create = async (props: IUserProps) => usersRepo.create(props);

const update = async (
  id: string, props: IUserProps
): Promise<User> => usersRepo.update(id, props);

const remove = async (id: string): Promise<void> => {
  await usersRepo.remove(id);
};

export = {
  getAll,
  getById,
  create,
  update,
  remove,
};
