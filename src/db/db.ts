import { getConnection, createConnection } from 'typeorm';
//
import { logDebug } from '../logger';
import { ormconfig, constants } from '../common';

const { DB_RECONNECTION_TIMEOUT, DB_RECONNECTION_TRIES } = constants;

export const connectDB = async (name?: string): Promise<void> => {
  logDebug('Please wait, connecting to database.');

  try {
    if (getConnection(name)) {
      logDebug(`Using ${name || 'default'} connection.`);
    }
  } catch {
    logDebug('Please wait, creating new connection.');
  }

  for (let i = 0; i < DB_RECONNECTION_TRIES; i += 1) {
    try {
      await createConnection(ormconfig);
      return;
    } catch (error) {
      logDebug(
        `reconnecting: ${i + 1} / ${DB_RECONNECTION_TRIES}; reason: ${
          error.message
        }`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, DB_RECONNECTION_TIMEOUT)
      );
    }
  }

  throw new Error('Could not connect to database!');
};
