import { PORT } from './common/config';
import { connectDB } from './db/db';
import app from './app';

const run = async () => {
  await connectDB();

  app.listen(PORT, () => {
    process.stdout.write(`App is running on http://localhost:${PORT}\n`);
  });
};

run();
