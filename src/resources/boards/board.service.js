const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

/**
 * @param {String} id
 * @returns {Board}
 */
const getById = (id) => boardsRepo.getById(id);

/**
 * @param {Object} props
 * @returns {Board}
 */
const create = (props) => boardsRepo.create(new Board(props));

/**
 * @param {String} id
 * @param {Object} props
 * @returns {Board}
 */
const update = (id, props) => boardsRepo.update(id, props);

const remove = async (id) => {
  await boardsRepo.remove(id);
  await tasksService.removeAllOnBoard(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
