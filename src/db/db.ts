import { getConnection, createConnection } from 'typeorm';
import ormconfig from '../common/ormconfig';

const tries = 10;
const timeout = 1000;

export const connectDB = async (): Promise<void> => {
  let connection = null;

  process.stdout.write('Connecting to database!\n');

  try {
    connection = getConnection();
    process.stdout.write('Default connection found!\n');
  } catch {
    for (let i = 0; i < tries; i += 1) {
      try {
        connection = await createConnection(ormconfig);

        if (connection) {
          process.stdout.write('New connection established!\n');
          return;
        }
      } catch (error) {
        process.stdout.write(
          `reconnecting: ${i + 1} / ${tries}; reason: ${error.message}\n`
        );

        await new Promise((resolve) => setTimeout(resolve, timeout));
      }
    }
  }

  if (!connection) {
    throw new Error('Could not connect to database!');
  }
};
