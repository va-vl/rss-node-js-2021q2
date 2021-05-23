/**
 * User service
 * @module user/service
 */
const User = require('./user.model');
const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

/**
 * Calls repository and retrieves all users
 * @returns {Promise<Array<User>>} - promise resolving to array of User instances
 * {@link module:user/repository}
 */
const getAll = () => usersRepo.getAll();

/**
 * Calls repository and retrieves one user by id
 * @param {String} id - user id
 * @throws {DataCorruptedError} - rejects if more than one user with id found
 * @throws {UserNotFoundError} - rejects if no User found
 * @returns {Promise<User>} - promise resolving to array of User instances
 * {@link module:user/repository}
 */
const getById = (id) => usersRepo.getById(id);

/**
 * Creates a user from props and sends to repository to be added to database
 * @param {props} userProps - a collection of key: value pairs
 * @throws {DataCorruptedError} - rejects if more than one user with id found
 * @returns {Promise<User>} - promise resolving to array of User instances
 * {@link module:user/repository}
 */
const create = (userProps) => usersRepo.create(new User(userProps));

/**
 * Forwards new user props to repository
 * @param {String} id - user id
 * @param {Object} props - a collection of key: value pairs
 * @throws {DataCorruptedError} - rejects if more than one user with id found
 * @throws {UserNotFoundError} - rejects if no User found
 * @returns {Promise<User>} - promise resolving to array of User instances
 * {@link module:user/repository}
 */
const update = (id, props) => usersRepo.update(id, props);

/**
 * Forwards id of a user to be removed to repository, cleans up tasks
 * @param {String} id - user id
 * @throws {DataCorruptedError} - rejects if more than one user with id found
 * @throws {UserNotFoundError} - rejects if no User found
 * @returns {void}
 * {@link module:user/repository}.
 * {@link module:task/service}
 */
const remove = async (id) => {
  await usersRepo.remove(id);
  await taskService.removeUserBinding(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
