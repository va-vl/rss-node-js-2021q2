import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const isCompiled = path.extname(__filename).includes('js');

export default {
  type: 'postgres',
  //
  host: process.env['DB_HOST'] ?? 'localhost',
  port: process.env['DB_PORT'] ? parseInt(process.env['DB_PORT'], 10) : 5432,
  database: process.env['DB'] ?? 'db',
  username: process.env['DB_USER'] ?? 'postgres',
  password: process.env['DB_PASSWORD'] ?? 'postgres',
  //
  synchronize: process.env['DB_SYNC'] === 'true',
  //
  logging: process.env['DB_LOGGING'] === 'true',
  //
  autoReconnect: true,
  reconnectTries: Number.MAX_SAFE_INTEGER,
  reconnectInterval: 2000,
  //
  entities: [`../entities/**/*.${isCompiled ? 'js' : 'ts'}`],
} as ConnectionOptions;
