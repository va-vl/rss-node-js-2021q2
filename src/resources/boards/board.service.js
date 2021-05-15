const boardsRepo = require('./board.memory.repository');
const tasksService = require("../tasks/task.service");
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const create = (board) => boardsRepo.create(new Board(board));

const update = (id, board) => boardsRepo.update(id, board);

const remove = async (id) => {
  await boardsRepo.remove(id);
  await tasksService.deleteAllFromBoard(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};