import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

const isCompiled = path.extname(__filename).includes('js');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const {
  DB,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNC,
  DB_LOGGING,
} = process.env;

export default {
  type: 'postgres',
  //
  database: DB ?? 'postgres',
  host: DB_HOST ?? 'localhost',
  username: DB_USER ?? 'postgres',
  password: DB_PASSWORD ?? 'postgres',
  port: DB_PORT ? +DB_PORT : 5432,
  //
  synchronize: DB_SYNC === 'true',
  //
  logging: DB_LOGGING === 'true',
  //
  autoReconnect: true,
  reconnectTries: Number.MAX_SAFE_INTEGER,
  reconnectInterval: 2000,
  //
  entities: [`../entities/**/*.${isCompiled ? 'js' : 'ts'}`],
} as ConnectionOptions;
