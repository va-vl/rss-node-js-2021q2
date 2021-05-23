/**
 * Task service
 * @module task/service
 */
const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

/**
 * Forwards boardId to task/repository and retrieves all tasks on that board
 * @param {String} boardId - board id
 * @returns {Promise<Array<Task>>} - promise resolving to array of Tasks on Board
 */
const getAll = async (boardId) => tasksRepo.getAll(boardId);

/**
 * Forwards boardId and task id to task/repository and retrieves task with id on board
 * @param {String} boardId - board id
 * @param {String} id - task id
 * @throws {DataCorruptedError} - rejects if more than one task with id was found on the board
 * @throws {TaskNotFoundError} - rejects if no Tasks with id was found on the board
 * @returns {Promise<Task>} - promise resolving to Task on Board
 */
const getById = async (boardId, id) => tasksRepo.getById(boardId, id);

/**
 * Creates a new Task instance from props and forwards to task/repository to be added to db
 * @param {String} boardId - board id
 * @param {Object} props - a collection of key: value pairs
 * @throws {DataCorruptedError} - rejects if more task with id already exists on the board
 * @returns {Promise<Task>} - promise resolving to Task on Board
 */
const create = async (boardId, props) =>
  tasksRepo.create(new Task({ ...props, boardId }));

/**
 * Forwards new props to be applied to task on board
 * @param {String} boardId - board id
 * @param {String} id - task id
 * @param {Object} props - a collection of key: value pairs
 * @throws {DataCorruptedError} - rejects if more than one task with id was found on the board
 * @throws {TaskNotFoundError} - rejects if no Tasks with id was found on the board
 * @returns {Task}
 */
const update = async (boardId, id, props) =>
  tasksRepo.update(boardId, id, props);

/**
 * Calls task/repository to remove task on board
 * @param {String} boardId
 * @param {String} id
 * @throws {DataCorruptedError} - rejects if more than one task with id was found on the board
 * @throws {TaskNotFoundError} - rejects if no Tasks with id was found on the board
 * @returns {void}
 */
const remove = async (boardId, id) => tasksRepo.remove(boardId, id);

/**
 * Forwards boardId to task/repository to find and remove all tasks on board
 * @param {String} boardId - board id
 * @returns {void}
 */
const removeAllOnBoard = async (boardId) => tasksRepo.removeAllOnBoard(boardId);

/**
 * Forwards userId to task/repository to unbind user from all tasks
 * @param {String} userId - user id
 * @return {void}
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
