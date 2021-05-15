const User = require('./user.model');
const usersRepo = require('./user.memory.repository');
const taskService = require("../tasks/task.service")

/**
 * @returns {Array}
 */
const getAll = () => usersRepo.getAll();

/**
 * @param {String} id 
 * @returns {Object}
 */
const getById = (id) => usersRepo.getById(id);

/**
 * @param {String} user 
 * @returns {Object}
 */
const create = (user) => usersRepo.create(new User(user));

/**
 * @param {String} id 
 * @param {Object} user 
 * @returns 
 */
const update = (id, user) => usersRepo.update(id, user);

/**
 * @param {String} id 
 */
const remove = async (id) => {
  await usersRepo.remove(id);
  await taskService.unassignUser(id);
}

module.exports = { 
  getAll,
  getById,
  create,
  update,
  remove,
};
