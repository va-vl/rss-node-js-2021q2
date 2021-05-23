const BoardNotFoundError = require('./not-found/board-not-found-error');
const TaskNotFoundError = require('./not-found/task-not-found-error');
const UserNotFoundError = require('./not-found/user-not-found-error');
const DataCorruptedError = require('./data-corrupted-error');

module.exports = {
  BoardNotFoundError,
  TaskNotFoundError,
  UserNotFoundError,
  DataCorruptedError,
};
