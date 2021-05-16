const DB = require("../../db/db.memory");
// 
const EntityNotFoundError = require('../../errors/entity-not-found-error');

const ENTITY_NAME = 'Board';
const TABLE_NAME = 'Boards';

/**
 * @returns {<Board>}
 */
const getAll = async () => DB.getAllEntities(TABLE_NAME);

/**
 * @param {String} id 
 * @returns {Board}
 */
const getById = async (id) => {
  const board = await DB.getEntityById(TABLE_NAME, id);

  if (!board) {
    throw new EntityNotFoundError(ENTITY_NAME, id);
  }

  return board;
};

/**
 * @param {Board} board 
 * @returns {Board}
 */
const create = async (board) => DB.createEntity(TABLE_NAME, board);

/**
 * @param {String} id 
 * @param {Object} props 
 * @returns {Board}
 */
const update = async (id, props) => {
  const board = await DB.updateEntity(TABLE_NAME, id, props);
  
  if (!board) {
    throw new EntityNotFoundError(ENTITY_NAME, id);
  }

  return board;
};

/**
 * @param {Sting} id 
 */
const remove = async (id) => {
  const board = await DB.deleteEntity(TABLE_NAME, id);

  if (!board) {
    throw new EntityNotFoundError(ENTITY_NAME, id);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
