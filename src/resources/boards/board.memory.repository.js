/**
 * Board repository
 * @module board/repository
 */
const DB = require('../../db/db.memory');
//
const { BoardNotFoundError } = require('../../errors');

const TABLE_NAME = 'Boards';

/**
 * @typedef {@link module:board/model} Board
 */

/**
 * Retrieves all instances of Board class
 * @returns {Promise<Array<Board>>} promise resolving to array of all boards
 */
const getAll = async () => DB.getAllEntities(TABLE_NAME);

/**
 * Retrieves an instance of Board by id
 * @param {String} id board id
 * @throws {BoardNotFoundError} if board was not found
 * @throws {DataCorruptedError} if there are two boards with same id
 * @returns {Promise<Board>} promise resolving to board
 */
const getById = async (id) => {
  const board = await DB.getEntityById(TABLE_NAME, id);

  if (!board) {
    throw new BoardNotFoundError(id);
  }

  return board;
};

/**
 * Forwards an instance of Board to be added to database
 * @param {Board} boardInstance board instance
 * @throws {DataCorruptedError} rejects if more than one entity with given id found
 * @returns {Promise<Board>} promise resolving to provided boardInstance
 */
const create = async (boardInstance) =>
  DB.createEntity(TABLE_NAME, boardInstance);

/**
 * Forwards set of new props to be applied to board with id
 * @param {String} id board id
 * @param {Board} props collection of key: value pairs
 * @throws {BoardNotFoundError} rejects if board was not found
 * @throws {DataCorruptedError} rejects if more than one entity with given id found
 * @returns {Promise<Board>} promise resolving to updated Board instance
 */
const update = async (id, props) => {
  const board = await DB.updateEntity(TABLE_NAME, id, props);

  if (!board) {
    throw new BoardNotFoundError(id);
  }

  return board;
};

/**
 * Forwards id of a board to be removed to database
 * @param {Sting} id board id
 * @throws {BoardNotFoundError} rejects if board was not found
 * @throws {DataCorruptedError} rejects if more than one entity with given id found
 * @returns {void}
 */
const remove = async (id) => {
  const board = await DB.deleteEntity(TABLE_NAME, id);

  if (!board) {
    throw new BoardNotFoundError(id);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
