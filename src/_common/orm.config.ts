import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
//
import config from './config';
import { User } from './../users/entities/user.entity';

export default registerAs('orm.config', (): TypeOrmModuleOptions => {
  const { DB, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = config();

  return {
    type: 'postgres',
    //
    database: DB,
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    // //
    // synchronize: process.env['DB_SYNC'] === 'true',
    // //
    // logging: process.env['DB_LOGGING'] === 'true',
    // //
    // entities: ['src/entities/**/*.ts'],
    // migrations: ['src/migrations/**/*.ts'],
    // cli: {
    //   entitiesDir: 'src/entities',
    //   migrationsDir: 'src/migrations',
    // },
    // migrationsRun: true,
    synchronize: true,
    entities: [User],
  };
});
