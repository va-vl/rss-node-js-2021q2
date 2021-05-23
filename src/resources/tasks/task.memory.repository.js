/**
 * Task repository
 * @module task/repository
 */
const DB = require('../../db/db.memory');
const { TaskNotFoundError } = require('../../errors');

const TABLE_NAME = 'Tasks';

/**
 * Retrieves all Tasks from a given boardId
 * @param {String} boardId - id of a board Task belongs to
 * @returns {Promise<Array<Task>>} - a promise resolving to array of Tasks
 */
const getAll = async (boardId) =>
  DB.getEntitiesByProps(TABLE_NAME, { boardId });

/**
 * Retrieves a Task instance by id and boardId
 * @param {String} boardId - id of a board Task belongs to
 * @param {String} id - task id
 * @throws {DataCorruptedError} - rejects if more than one task with id was found on the board
 * @throws {TaskNotFoundError} - rejects if no Tasks with id was found on the board
 * @returns {Promise<Task>} - a promise resolving to Task instance
 */
const getById = async (boardId, id) => {
  const task = await DB.getEntityByIdAndProps(TABLE_NAME, id, { boardId });

  if (!task) {
    throw new TaskNotFoundError(id, boardId);
  }

  return task;
};

/**
 * Forwards a task instance to database
 * @param {Task} taskInstance - a Task instance
 * @throws {DataCorruptedError} - rejects if more task with id already exists on the board
 * @returns {Promise<Task>} - a promise resolving to Task instance
 */
const create = async (taskInstance) =>
  DB.createEntity(TABLE_NAME, taskInstance);

/**
 * Forwards set of new props to be applied to task on board
 * @param {String} boardId - id of a board where task is found
 * @param {String} id - task id
 * @param {Object} props - a collection of key: value pairs
 * @throws {DataCorruptedError} - rejects if more than one task with id was found on the board
 * @throws {TaskNotFoundError} - rejects if no Tasks with id was found on the board
 * @returns {Promise<Task>} - a promise resolving to updated Task
 */
const update = async (boardId, id, props) => {
  const updatedTask = await DB.updateEntity(TABLE_NAME, id, props);

  if (!updatedTask) {
    throw new TaskNotFoundError(id, boardId);
  }

  return updatedTask;
};

/**
 * Deletes task from a given board
 * @param {String} boardId - id of a board
 * @param {String} id - task id
 * @throws {DataCorruptedError} - rejects if more than one task with id was found on the board
 * @throws {TaskNotFoundError} - rejects if no Tasks with id was found on the board
 * @returns {void}
 */
const remove = async (boardId, id) => {
  const removedTask = await DB.deleteEntity(TABLE_NAME, id);

  if (!removedTask) {
    throw new TaskNotFoundError(id, boardId);
  }
};

/**
 * Deletes all tasks on a given board
 * @param {String} boardId - board id
 * @returns {void}
 */
const removeAllOnBoard = async (boardId) => {
  const removedTasks = await DB.getEntitiesByProps(TABLE_NAME, { boardId });

  removedTasks.forEach(async (task) => {
    await remove(boardId, task.id);
  });
};

/**
 * If userId of a task equals the provided userId, sets Task's userId to null
 * @param {String} userId - user id
 * @returns {void}
 */
const removeUserBinding = async (userId) => {
  const tasks = await DB.getAllEntities(TABLE_NAME);

  tasks.forEach(async (task) => {
    if (task.userId === userId) {
      await DB.updateEntity(TABLE_NAME, task.id, { userId: null });
    }
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAllOnBoard,
  removeUserBinding,
};
