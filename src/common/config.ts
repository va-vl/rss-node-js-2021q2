import dotenv from 'dotenv';
import path from 'path';
//
import * as constants from './constants';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const {
  DEFAULT_PORT,
  DEFAULT_JWT_SECRET_KEY,
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
  JWT_SECRET_KEY,
  AUTH_MODE,
  //
  DB,
  DB_PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_SYNC,
  DB_LOGGING,
} = process.env;

export default {
  NODE_ENV,
  //
  PORT: Number(PORT) || DEFAULT_PORT,
  JWT_SECRET_KEY: JWT_SECRET_KEY || DEFAULT_JWT_SECRET_KEY,
  AUTH_MODE: AUTH_MODE === 'true',
  //
  DB: DB || DEFAULT_DB,
  DB_PORT: Number(DB_PORT) || DEFAULT_DB_PORT,
  DB_HOST: DB_HOST || DEFAULT_DB_HOST,
  DB_USER: DB_USER || DEFAULT_DB_USER,
  DB_PASSWORD: DB_PASSWORD || DEFAULT_DB_PASSWORD,
  DB_SYNC: DB_SYNC === 'true',
  DB_LOGGING: DB_LOGGING === 'true',
};
