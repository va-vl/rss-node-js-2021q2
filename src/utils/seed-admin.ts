import { getConnection, getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
//
import { User } from 'src/modules/users/entities/user.entity';
import { config } from './../common';

export default async function () {
  const admin = await getRepository(User).findOne({
    where: {
      login: 'admin',
    },
  });

  if (admin) {
    return;
  }

  const { JWT_SALT_ROUNDS } = config();
  const salt = await bcrypt.genSalt(JWT_SALT_ROUNDS);
  const passwordHash = await bcrypt.hash('admin', salt);

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
}
