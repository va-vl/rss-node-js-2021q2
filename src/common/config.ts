import { registerAs } from '@nestjs/config';
import * as constants from './constants';

export default registerAs('config', () => {
  const {
    DEFAULT_PORT,
    DEFAULT_JWT_SALT_ROUNDS,
    DEFAULT_DB,
    DEFAULT_DB_PORT,
    DEFAULT_DB_HOST,
    DEFAULT_DB_USER,
    DEFAULT_DB_PASSWORD,
  } = constants;

  const {
    NODE_ENV,
    //
    PORT,
    //
    AUTH_MODE,
    //
    JWT_SECRET_KEY,
    JWT_SALT_ROUNDS,
    //
    DB,
    DB_PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_SYNC,
    DB_LOGGING,
  } = process.env;

  return {
    NODE_ENV,
    //
    PORT: Number(PORT) || DEFAULT_PORT,
    //
    AUTH_MODE: AUTH_MODE === 'true',
    //
    JWT_SECRET_KEY,
    JWT_SALT_ROUNDS: Number(JWT_SALT_ROUNDS) || DEFAULT_JWT_SALT_ROUNDS,
    //
    DB: DB || DEFAULT_DB,
    DB_PORT: Number(DB_PORT) || DEFAULT_DB_PORT,
    DB_HOST: DB_HOST || DEFAULT_DB_HOST,
    DB_USER: DB_USER || DEFAULT_DB_USER,
    DB_PASSWORD: DB_PASSWORD || DEFAULT_DB_PASSWORD,
    DB_SYNC: DB_SYNC === 'true',
    DB_LOGGING: DB_LOGGING === 'true',
  };
});
