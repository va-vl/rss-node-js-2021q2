import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
//
import config from './config';
import { Task } from '../modules/tasks/entities/task.entity';
import { User } from '../modules/users/entities/user.entity';
import { Board } from '../modules/boards/entities/board.entity';
import { BoardColumn } from '../modules/boards/entities/board-column.entity';

export default registerAs('orm.config', (): TypeOrmModuleOptions => {
  const { DB, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_SYNC, DB_LOGGING } =
    config();

  return {
    type: 'postgres',
    //
    database: DB,
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    //
    synchronize: DB_SYNC,
    //
    logging: DB_LOGGING,
    //
    entities: [User, Board, BoardColumn, Task],
    migrations: ['dist/db/migrations/*-migration.js'],
    cli: {
      migrationsDir: 'db/migrations',
    },
    migrationsRun: true,
  };
});
