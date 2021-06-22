import { config } from './common';
import { connectDB } from './db/db';
import app from './app';

const { PORT } = config;

const run = async () => {
  await connectDB();

  app.listen(PORT, () => {
    process.stdout.write(`App is running on http://localhost:${PORT}\n`);
  });
};

run();
