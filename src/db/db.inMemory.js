const User = require("../resources/users/user.model");
const Board = require("../resources/boards/board.model");
const Task = require("../resources/tasks/task.model");

const db = {
  Users: [],
  Boards: [],
  Tasks: [],

  fixUsersStructure: (user) => {
    if (user) {
      db.Tasks.filter((task) => task).forEach((task2) => {
        // eslint-disable-next-line no-param-reassign
        task2.userId = task2.userId === user.id ? null : task2.userId;
      });
    }
  },

  fixBoardsStructure: (board) => {
    if (board) {
      db.Tasks.filter((task) => task && task.boardId === board.id).forEach((task2) => {
        db.Tasks[db.Tasks.indexOf(task2)] = undefined
      })
    }
  },

  fixTaskStructure: () => {},
};

// init DB with mock data
(() => {
  for (let i = 0; i < 3; i += 1) {
    db.Users.push(new User());
  }

  const board = new Board();

  db.Boards.push(board);

  db.Tasks.push(
    new Task({ boardId: board.id }),
    new Task({ boardId: board.id }),
  );
})()

const getAllEntities = (tableName) => db[tableName].filter((entity) => entity);

const getEntity = (tableName, id) => {
  const entities = db[tableName]
    .filter((entity) => entity)
    .filter((entity) => entity.id === id);

  if (entities.length > 1) {
    console.error(`
      The DB data is damaged. Table: ${tableName}. EntityId: ${id}.
    `)

    throw Error("The DB data is wrong!");
  }

  return entities[0];
}

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);

  if (entity) {
    db[`fix${tableName}Structure`](entity);

    const index = db[tableName].indexOf(entity);

    db[tableName] = [
      ...db[tableName].slide(0, index),
      ...(db[tableName].length > index + 1
            ? db[tableName].slice(index + 1)
            : [])
    ];
  }

  return entity;
}

const saveEntity = (tableName, entity) => {
  db[tableName].push(entity);

  return getEntity(tableName, entity.db);
};

const updateEntity = async (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);

  if (oldEntity) {
    db[tableName][db[tableName.indexOf(oldEntity)]] = {...entity};
  }

  return getEntity(tableName, id);
}

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  saveEntity,
  updateEntity,
};