/**
 * Board service
 * @module board/service
 */
const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

/**
 * Calls repository to retrieve all boards
 * @returns {Promise<Array<Board>>} promise resolving to array of boards
 * {@link module:board/repository}
 */
const getAll = async () => boardsRepo.getAll();

/**
 * Calls board/repository to retrieve one board by id
 * @param {String} id board id
 * @throws {BoardNotFoundError} if board was not found
 * @throws {DataCorruptedError} if there are two boards with same id
 * @returns {Promise<Board>} promise resolving to board
 * {@link module:board/repository}
 */
const getById = async (id) => boardsRepo.getById(id);

/**
 * Forwards a newly-created Board instance to repository
 * @param {Object} props collection of key: value pairs
 * @throws {DataCorruptedError} rejects if more than one entity with given id found
 * @returns {Promise<Board>} promise resolving to board
 * {@link module:board/repository}
 */
const create = async (props) => boardsRepo.create(new Board(props));

/**
 * Forwards new props that should be applied to board with id to repository
 * @param {String} id board id
 * @param {Object} props collection of key: value pairs
 * @throws {BoardNotFoundError} rejects if board was not found
 * @throws {DataCorruptedError} rejects if more than one entity with given id found
 * @returns {Promise<Board>} promise resolving to Board
 * {@link module:board/repository}
 */
const update = async (id, props) => boardsRepo.update(id, props);

/**
 * Calls repository to remove board and task service to remove all tasks associated with removed board
 * @param {String} id board id
 * @throws {DataCorruptedError} rejects if more than one entity with given id found
 * @returns {void}
 * {@link module:board/repository}
 * {@link module:task/service}
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
