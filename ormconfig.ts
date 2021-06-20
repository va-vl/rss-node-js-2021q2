import dotenv from 'dotenv';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export default {
  type: 'postgres',
  //
  database: process.env['DB'] || 'postgres',
  host: process.env['DB_HOST'] || 'localhost',
  username: process.env['DB_USER'] || 'postgres',
  password: process.env['DB_PASSWORD'] || 'postgres',
  port: +String(process.env['DB_PORT']) || 5432,
  //
  synchronize: process.env['DB_SYNC'] === 'true',
  //
  logging: process.env['DB_LOGGING'] === 'true',
  //
  entities: ['./src/entities/**/*.ts'],
  migrations: ['./src/migrations/**/*.ts'],
  cli: {
    entitiesDir: './src/entities',
    migrationsDir: './src/migrations',
  },
} as ConnectionOptions;
