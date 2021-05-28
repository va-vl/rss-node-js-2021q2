import BoardNotFoundError = require('./not-found/board-not-found-error');
import TaskNotFoundError = require('./not-found/task-not-found-error');
import UserNotFoundError = require('./not-found/user-not-found-error');
import DataCorruptedError = require('./data-corrupted-error');

export = {
  BoardNotFoundError,
  TaskNotFoundError,
  UserNotFoundError,
  DataCorruptedError,
};
