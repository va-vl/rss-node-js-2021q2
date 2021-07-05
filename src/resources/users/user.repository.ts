import { getRepository } from 'typeorm';
//
import { User, IUser } from '../../entities/user';

export const getAll = async (): Promise<IUser[]> => getRepository(User).find();

export const getById = async (id: string): Promise<IUser> =>
  getRepository(User).findOneOrFail({ where: { id } });

export const create = async (dto: Partial<IUser>): Promise<IUser> => {
  const userRepository = getRepository(User);
  return userRepository.save(userRepository.create(dto));
};

export const update = async (
  id: string,
  dto: Partial<IUser>
): Promise<IUser> => {
  const user = await getById(id);
  return getRepository(User).save({ ...user, ...dto });
};

export const remove = async (id: string): Promise<void> => {
  const userRepository = getRepository(User);
  await userRepository.delete({ id });
};
