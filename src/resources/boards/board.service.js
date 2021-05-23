/**
 * Board service
 * @module board/service
 */
const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

/**
 * Calls board/repository to retrieve all boards
 * @returns {Promise<Array<Board>>} - a promise resolving to array of Board instances
 */
const getAll = async () => boardsRepo.getAll();

/**
 * Calls board/repository to retrieve one board by id
 * @param {String} id - board id
 * @throws {BoardNotFoundError} - if board was not found
 * @throws {DataCorruptedError} - if there are two boards with same id
 * @returns {Promise<Board>} - promise resolving to Board instance
 */
const getById = async (id) => boardsRepo.getById(id);

/**
 * Forwards a newly-created Board instance to board/repository
 * @param {Object} props - a collection of key: value pairs
 * @throws {DataCorruptedError} - rejects if more than one entity with given id found
 * @returns {Promise<Board>} - promise resolving to Board instance
 */
const create = async (props) => boardsRepo.create(new Board(props));

/**
 * Forwards new props that should be applied to board with id to board/repository
 * @param {String} id - board id
 * @param {Object} props - a collection of key: value pairs
 * @throws {BoardNotFoundError} - rejects if board was not found
 * @throws {DataCorruptedError} - rejects if more than one entity with given id found
 * @returns {Promise<Board>} - a promise resolving to Board
 */
const update = async (id, props) => boardsRepo.update(id, props);

/**
 * Calls board/repository to remove board and task/service to remove all tasks associated with removed board
 * @param {String} id - board id
 * @throws {DataCorruptedError} - rejects if more than one entity with given id found
 * @returns {void}
 */
const remove = async (id) => {
  await boardsRepo.remove(id);
  await tasksService.removeAllOnBoard(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
