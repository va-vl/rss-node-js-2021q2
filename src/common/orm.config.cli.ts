import { ConnectionOptions } from 'typeorm';
//
import config from './config';
import { Task } from '../modules/tasks/entities/task.entity';
import { User } from '../modules/users/entities/user.entity';
import { Board } from '../modules/boards/entities/board.entity';
import { BoardColumn } from '../modules/boards/entities/board-column.entity';

const { DB, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_SYNC, DB_LOGGING } =
  config();

export default {
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
  entities: [Task, User, Board, BoardColumn],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  migrationsRun: true,
  seeds: ['src/seeds/*.seed{.ts, .js}'],
} as ConnectionOptions;
