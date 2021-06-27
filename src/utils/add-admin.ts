import { getConnection, getRepository } from 'typeorm';
//
import * as encryptor from './encryptor';
import { User } from '../entities/user';

export default async (): Promise<void> => {
  const user = await getRepository(User).findOne({ login: 'admin' });

  if (user !== undefined) {
    return;
  }

  const passwordHash = await encryptor.hashPassword('admin');

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      name: 'admin',
      login: 'admin',
      password: passwordHash,
    })
    .execute();
};
