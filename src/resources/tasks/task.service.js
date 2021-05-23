const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

/**
 * @param {String} boardId 
 * @returns {<Task>}
 */
const getAll = (boardId) => tasksRepo.getAll(boardId);

/**
 * @param {String} boardId 
 * @param {String} id 
 * @returns {Task}
 */
const getById = (boardId, id) => tasksRepo.getById(boardId, id);

/**
 * @param {String} boardId 
 * @param {Object} task 
 * @returns {Task}
 */
const create = (boardId, task) => tasksRepo.create(new Task({...task, boardId}));

/**
 * @param {String} boardId 
 * @param {String} id 
 * @param {Object} task 
 * @returns {Task}
 */
const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);

/**
 * @param {String} boardId 
 * @param {String} id 
 */
const remove = (boardId, id) => tasksRepo.remove(boardId, id);

/**
 * @param {String} boardId 
 */
const removeAllOnBoard = (boardId) => tasksRepo.removeAllOnBoard(boardId);

/**
 * @param {String} userId 
 */
const removeUserBinding = (userId) => tasksRepo.removeUserBinding(userId);

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAllOnBoard,
  removeUserBinding,
};