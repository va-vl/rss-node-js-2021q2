const DB = require("../../db/db.memory");
const Task = require("./task.model");
const TaskNotFoundError = require("../../errors/task-not-found-error");

const TABLE_NAME = 'Tasks';

/**
 * @param {String} boardId 
 * @returns {<Task>}
 */
const getAll = async (boardId) => DB.getEntitiesByProps(TABLE_NAME, { boardId });

/**
 * @param {String} boardId 
 * @param {String} id 
 * @returns {Task}
 */
const getById = async (boardId, id) => {
  const task = await DB.getEntityByIdAndProps(TABLE_NAME, id, { boardId });

  if (!task) {
    throw new TaskNotFoundError(id, boardId);
  }

  return task;
};

/**
 * @param {Object} task 
 * @returns {Task} 
 */
const create = async (task) => DB.createEntity(TABLE_NAME, task);

/**
 * @param {String} boardId 
 * @param {String} id 
 * @param {Object} props 
 * @returns {Task}
 */
const update = async (boardId, id, props) => {
  const updatedTask = await DB.updateEntity(TABLE_NAME, id, props);

  if (!updatedTask) {
    throw new TaskNotFoundError(id, boardId);
  }

  return updatedTask;
};

/**
 * @param {String} boardId 
 * @param {String} id 
 */
const remove = async (boardId, id) => {
  const removedTask = await DB.deleteEntity(TABLE_NAME, id);

  if (!removedTask) {
    throw new TaskNotFoundError(id, boardId);
  }
};

/**
 * @param {String} boardId 
 */
const removeAllOnBoard = async (boardId) => {
  const removedTasks = await DB.getEntitiesByProps(TABLE_NAME, { boardId });

  removedTasks.forEach(async (task) => {
    await remove(boardId, task.id);
  });
};

/**
 * @param {String} userId 
 */
const removeUserBinding = async (userId) => {
  const tasks = await DB.getAllEntities(TABLE_NAME);

  tasks.forEach(async (task) => {
    if (task.userId === userId) {      
      await update(
        task.boardId,
        task.id,
        new Task({ ...task, userId: null })
      );
    }
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  removeAllOnBoard,
  removeUserBinding,
};