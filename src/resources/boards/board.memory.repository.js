const DB = require("../../db/db.memory");
// 
const NotFoundError = require('../../errors/not-found-error');

const ENTITY_NAME = 'Board';
const TABLE_NAME = 'Boards';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

/**
 * @param {String} id 
 * @returns {Object}
 */
const getById = async (id) => {
  const board = await DB.getEntityById(TABLE_NAME, id);

  if (!board) {
    throw new NotFoundError(ENTITY_NAME, id);
  }

  return board;
};

/**
 * @param {Object} board 
 * @returns {Object}
 */
const create = async (board) => DB.createEntity(TABLE_NAME, board);

/**
 * @param {String} id 
 * @param {Object} board 
 * @returns {Object}
 */
const update = async (id, board) => {
  const updatedBoard = await DB.updateEntity(TABLE_NAME, id, board);
  
  if (!updatedBoard) {
    throw new NotFoundError(ENTITY_NAME, id);
  }

  return updatedBoard;
};

/**
 * @param {Sting} id 
 */
const remove = async id => {
  const deletedBoard = await DB.deleteEntity(TABLE_NAME, id);

  if (!(deletedBoard)) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
