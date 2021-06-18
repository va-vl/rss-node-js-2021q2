import { getConnection, createConnection } from 'typeorm';
import ormconfig from '../common/ormconfig';

export const connectDB = async () => {
  let connection = null;

  try {
    connection = getConnection();
  } catch (error) {
    // handle error
  }

  try {
    if (connection && !connection.isConnected) {
      await connection.connect();
    } else {
      await createConnection(ormconfig);
    }

    process.stdout.write('Succesfully DB connected');
  } catch (error) {
    process.stdout.write('Unable to connect to DB');
    process.stdout.write(String(error));
    process.exit(1);
  }
};
