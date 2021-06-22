import 'reflect-metadata';
import path from 'path';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
//
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import {
  appErrorHandler,
  appRequestLogger,
  resourceNotFoundHandler,
} from './middleware';
import { createFatalErrorLogMessage, logFatalError } from './logger';

process.on('uncaughtException', (err) => {
  logFatalError(
    createFatalErrorLogMessage(
      'An exception has occurred!',
      err.message,
      String(err.stack)
    )
  );
});

process.on('unhandledRejection', (_, promise) => {
  promise.catch((err) => {
    logFatalError(
      createFatalErrorLogMessage(
        'A rejection was not handled!',
        err.message,
        String(err.stack)
      )
    );
  });
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(appRequestLogger);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId', taskRouter);

app.use(resourceNotFoundHandler);
app.use(appErrorHandler);

export default app;
