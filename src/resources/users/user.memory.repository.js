const db = require("../../db/db.memory");
const MissingError = require("../../errors/missing-error");

const ENTITY_NAME = 'User';
const TABLE_NAME = 'Users';

const getAll = async () => db.getAllEntities(TABLE_NAME);

/**
 * @param {String} id 
 * @returns {Object}
 */
const getById = async (id) => {
  const user = await db.getEntityById(TABLE_NAME, id);

  if (!user) {
    throw new MissingError(ENTITY_NAME, id);
  }

  return user;
};

/**
 * @param {User} user 
 * @returns {Object}
 */
const create = async (user) => db.createEntity(TABLE_NAME, user);

/**
 * 
 * @param {String} id 
 * @param {Object} props 
 * @returns {Object}
 */
const update = async (id, props) => {
  const user = await db.updateEntity(TABLE_NAME, id, props);

  if (!user) {
    throw new MissingError(ENTITY_NAME, id);
  }

  return user;
};

/**
 * @param {String} id 
 */
const remove = async (id) => {
  const user = await db.deleteEntity(TABLE_NAME, id);

  if (!user) {
    throw new MissingError(ENTITY_NAME, id);
  }
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
