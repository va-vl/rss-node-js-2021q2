const DB = require("../../db/db.memory");
// 
const MissingError = require('../../errors/missing-error');

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
    throw new MissingError(ENTITY_NAME, id);
  }

  return board;
};

/**
 * @param {Board} board 
 * @returns {Object}
 */
const create = async (board) => DB.createEntity(TABLE_NAME, board);

/**
 * @param {String} id 
 * @param {Object} props 
 * @returns {Object}
 */
const update = async (id, props) => {
  const board = await DB.updateEntity(TABLE_NAME, id, props);
  
  if (!board) {
    throw new MissingError(ENTITY_NAME, id);
  }

  return board;
};

/**
 * @param {Sting} id 
 */
const remove = async (id) => {
  const board = await DB.deleteEntity(TABLE_NAME, id);

  if (!board) {
    throw new MissingError(ENTITY_NAME, id);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
