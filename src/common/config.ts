import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

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
  PORT: Number(PORT) || 4000,
  JWT_SECRET_KEY: JWT_SECRET_KEY || 'secret',
  AUTH_MODE: AUTH_MODE === 'true',
  //
  DB: DB || 'postgres',
  DB_PORT: Number(DB_PORT) || 5432,
  DB_HOST: DB_HOST || 'postgres',
  DB_USER: DB_USER || 'postgres',
  DB_PASSWORD: DB_PASSWORD || 'postgres',
  DB_SYNC: DB_SYNC === 'true',
  DB_LOGGING: DB_LOGGING === 'true',
};
