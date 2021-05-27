/**
 * Task service
 * @module task/service
 */
const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

/**
 * Forwards boardId to repository and retrieves all tasks on that board
 * @param {String} boardId board id
 * @returns {Promise<Array<Task>>} promise resolving to array of tasks on board
 * {@link module:task/repository}
 */
const getAll = async (boardId) => tasksRepo.getAll(boardId);

/**
 * Forwards boardId and task id to repository and retrieves task with id on board
 * @param {String} boardId board id
 * @param {String} id task id
 * @throws {DataCorruptedError} rejects if more than one task with id was found on the board
 * @throws {TaskNotFoundError} rejects if no tasks with id was found on the board
 * @returns {Promise<Task>} promise resolving to task on board
 * {@link module:task/repository}
 */
const getById = async (boardId, id) => tasksRepo.getById(boardId, id);

/**
 * Creates a new Task instance from props and forwards to repository to be added to db
 * @param {String} boardId board id
 * @param {Object} props collection of key: value pairs
 * @throws {DataCorruptedError} rejects if more task with id already exists on the board
 * @returns {Promise<Task>} promise resolving to task on board
 * {@link module:task/repository}
 */
const create = async (boardId, props) =>
  tasksRepo.create(new Task({ ...props, boardId }));

/**
 * Forwards new props to be applied to task on board
 * @param {String} boardId board id
 * @param {String} id task id
 * @param {Object} props a collection of key: value pairs
 * @throws {DataCorruptedError} rejects if more than one task with id was found on the board
 * @throws {TaskNotFoundError} rejects if no task with id was found on the board
 * @returns {Task}
 * {@link module:task/repository}
 */
const update = async (boardId, id, props) =>
  tasksRepo.update(boardId, id, props);

/**
 * Calls repository to remove task on board
 * @param {String} boardId - board id
 * @param {String} id - task id
 * @throws {DataCorruptedError} rejects if more than one task with id was found on the board
 * @throws {TaskNotFoundError} rejects if no tasks with id was found on the board
 * @returns {void}
 * {@link module:task/repository}
 */
const remove = async (boardId, id) => tasksRepo.remove(boardId, id);

/**
 * Forwards boardId to repository to find and remove all tasks on board
 * @param {String} boardId board id
 * @returns {void}
 * {@link module:task/repository}
 */
const removeAllOnBoard = async (boardId) => tasksRepo.removeAllOnBoard(boardId);

/**
 * Forwards userId to repository to unbind user from all tasks
 * @param {String} userId user id
 * @return {void}
 * {@link module:task/repository}
 */
const removeUserBinding = async (userId) => tasksRepo.removeUserBinding(userId);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAllOnBoard,
  removeUserBinding,
};
