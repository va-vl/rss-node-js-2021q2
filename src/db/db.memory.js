const User = require("../resources/users/user.model");
const Board = require("../resources/boards/board.model");
const Task = require("../resources/tasks/task.model");

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  Columns: [],

  handleRemovedUsers (user) {
    this.Tasks.forEach((task) => {
      if (task.userId === user.id) {
        task.updateTask({...task, userId: null});
      }
    })
  },

  handleRemovedBoards (board) {
    this.Tasks = this.Tasks.filter((task) => task.id !== board.id);
  },
};

const getAllEntities = (tableName) => db[tableName];

const getEntity = (tableName, id) => {
  const entities = db[tableName].filter((entity) => entity.id === id);

  if (entities.length > 1) {
    process.stderr.write(`The DB data is damaged. Table: ${tableName}. EntityId: ${id}.`)
    
    throw Error("The DB data is wrong!");
  }

  return entities[0];
}

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);

  if (entity) {
    db[`handleRemoved${tableName}`](entity);

    const removedEntityIndex = db[tableName].indexOf(entity);

    db[tableName] = db.filter((_, index) => index !== removedEntityIndex);
  }

  return entity;
}

const saveEntity = (tableName, entity) => {
  db[tableName].push(entity);

  return getEntity(tableName, entity.id);
};

const updateEntity = (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);

  if (oldEntity) {
    const oldEntityIndex = db[tableName].indexOf(oldEntity)

    db[tableName][oldEntityIndex] = {...entity};
  }

  return getEntity(tableName, id);
};

/* #region mock data for db */
(() => {
  for (let i = 0; i < 5; i += 1) {
    db.Users.push(new User());
  }

  const board = new Board();

  db.Boards.push(board);

  db.Tasks.push(
    new Task({ boardId: board.id }),
    new Task({ boardId: board.id }),
  );
})()
/* #endregion */

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  saveEntity,
  updateEntity,
};