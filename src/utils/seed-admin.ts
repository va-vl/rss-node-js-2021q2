import { getRepository, getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
//
import { User } from 'src/modules/users/entities/user.entity';
import { config } from '../common';

export async function seedAdmin() {
  const admin = await getRepository(User).findOne({
    where: { login: 'admin' },
  });

  if (admin) {
    return;
  }

  const password = await bcrypt.hash('admin', config().JWT_SALT_ROUNDS);

  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      name: 'admin',
      login: 'admin',
      password,
    })
    .execute();
}
