const db = require("../../db/db.memory");
const NotFoundError = require("../../errors/not-found-error");

const ENTITY_NAME = 'User';
const TABLE_NAME = 'Users';

const getAll = async () => db.getAll(TABLE_NAME);

/**
 * @param {String} id 
 * @returns {Object}
 */
const getById = async (id) => {
  const user = await db.getEntityById(TABLE_NAME, id);

  if (!user) {
    throw new NotFoundError(ENTITY_NAME, id);
  }

  return user;
};

/**
 * @param {Object} user 
 * @returns {Object}
 */
const create = async (user) => db.createEntity(TABLE_NAME, user)

/**
 * 
 * @param {String} id 
 * @param {Object} user 
 * @returns {Object}
 */
const update = async (id, user) => {
  const updatedUser = await db.updateEntity(TABLE_NAME, id, user);

  if (!updatedUser) {
    throw new NotFoundError(ENTITY_NAME, id);
  }

  return updatedUser;
};

/**
 * @param {String} id 
 */
const remove = async (id) => {
  const deleteUserId = await db.deleteEntity(TABLE_NAME, id);

  if (!deleteUserId) {
    throw new NotFoundError(ENTITY_NAME, id);
  }
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
