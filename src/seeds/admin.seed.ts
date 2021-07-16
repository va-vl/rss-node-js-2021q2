import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
//
import { User } from '../modules/users/entities/user.entity';
import { config } from '../common';

export default class CreateUsers implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    const password = await bcrypt.hash('admin', config().JWT_SALT_ROUNDS);

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: 'admin',
        login: 'admin',
        password,
      })
      .onConflict(`("id") DO NOTHING`)
      .execute();
  }
}
