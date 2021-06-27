import app from './app';
import { connectDB } from './db/db';
import { config } from './common';
import { addAdmin } from './utils';
import { logDebug } from './logger';

const { PORT } = config;

const run = async () => {
  await connectDB();
  await addAdmin();

  app.listen(PORT, () => {
    logDebug(`App is running on http://localhost:${PORT}`);
  });
};

run();
