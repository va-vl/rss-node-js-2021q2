/**
 * Board repository
 * @module board/repository
 */
const DB = require('../../db/db.memory');
//
const { BoardNotFoundError } = require('../../errors');

const TABLE_NAME = 'Boards';

/**
 * An async function that resolves to all boards in the project
 * @returns {Promise<Array<Board>>} - returns a Promise resolving to an Array of Board instances
 */
const getAll = async () => DB.getAllEntities(TABLE_NAME);

/**
 * An async function that resolves to a board instance or rejects with BoardNotFound error
 * @param {String} id - board id
 * @returns {Promise<Board>}
 */
const getById = async (id) => {
  const board = await DB.getEntityById(TABLE_NAME, id);

  if (!board) {
    throw new BoardNotFoundError(id);
  }

  return board;
};

/**
 * @param {Board} board - Board instance
 * @returns {Promise<Board>}
 */
const create = async (board) => DB.createEntity(TABLE_NAME, board);

/**
 * @param {String} id
 * @param {Object} props
 * @returns {Promise<Board>}
 */
const update = async (id, props) => {
  const board = await DB.updateEntity(TABLE_NAME, id, props);

  if (!board) {
    throw new BoardNotFoundError(id);
  }

  return board;
};

/**
 * @param {Sting} id
 * @returns {undefined}
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
