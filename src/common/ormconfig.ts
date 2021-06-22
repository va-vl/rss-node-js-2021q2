import { ConnectionOptions } from 'typeorm';
//
import config from './config';

const {
  DB,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNC,
  DB_LOGGING,
} = config;

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
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions;
