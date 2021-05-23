/**
 * User repository
 * @module user/repository
 */
const DB = require('../../db/db.memory');
const { UserNotFoundError } = require('../../errors');

const TABLE_NAME = 'Users';

/**
 * Retrieves all users in database
 * @returns {Promise<Array<User>>} - a promise resolving to an array of User instances
 */
const getAll = async () => DB.getAllEntities(TABLE_NAME);

/**
 * Retrieves a user by id
 * @param {String} id - user id
 * @throws {DataCorruptedError} - rejects if more than one user with id found
 * @throws {UserNotFoundError} - rejects if no User found
 * @returns {Promise<User>} - a promise resolving to User instance
 */
const getById = async (id) => {
  const user = await DB.getEntityById(TABLE_NAME, id);

  if (!user) {
    throw new UserNotFoundError(id);
  }

  return user;
};

/**
 * Sends a User instance to database
 * @param {User} userInstance - an instance of User class
 * @throws {DataCorruptedError} - rejects if more than one user with id found
 * @returns {Promise<User>} - a promise resolving to User instance
 */
const create = async (user) => DB.createEntity(TABLE_NAME, user);

/**
 * Forwards props with new values to database to create a new User
 * @param {String} id - user id
 * @param {Object} props - a collection of key: value pairs
 * @throws {DataCorruptedError} - rejects if more than one user with id found
 * @throws {UserNotFoundError} - rejects if no User found
 * @returns {Promise<User>} - a promise resolving to User instance
 */
const update = async (id, props) => {
  const user = await DB.updateEntity(TABLE_NAME, id, props);

  if (!user) {
    throw new UserNotFoundError(id);
  }

  return user;
};

/**
 * Removes user by id
 * @param {String} id - user id
 * @throws {DataCorruptedError} - rejects if more than one user with id found
 * @throws {UserNotFoundError} - rejects if no User found
 * @returns {void}
 */
const remove = async (id) => {
  const user = await DB.deleteEntity(TABLE_NAME, id);

  if (!user) {
    throw new UserNotFoundError(id);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
