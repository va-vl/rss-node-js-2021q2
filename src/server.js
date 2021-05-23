const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, () => {
  process.stdout.write(test);
  process.stdout.write(`App is running on http://localhost:${PORT}\n`);
});
