const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const User = require('../resources/users/user.model');
const { DataCorruptedError } = require('../errors');

const db = {
  Tasks: [],
  Users: [],
  Boards: [],
};

/**
 * @param {String} tableName
 * @returns {Array}
 */
const getAllEntities = async (tableName) =>
  db[tableName].filter((entity) => entity);

/**
 * @param {String} tableName
 * @param {Object} props
 */
const getEntitiesByProps = async (tableName, props) => {
  const keys = Object.keys(props);

  return db[tableName].filter((entity) =>
    keys.every((key) => props[key] === entity[key])
  );
};

/**
 * @param {String} tableName
 * @param {String} id
 * @returns {Object|undefined}
 */
const getEntityById = async (tableName, id) => {
  const entities = db[tableName].filter((item) => id === item.id);

  if (entities.length > 1) {
    throw new DataCorruptedError(tableName, id);
  }

  return entities[0];
};

/**
 * @param {String} tableName
 * @param {String} id
 * @param {Props} props
 */
const getEntityByIdAndProps = async (tableName, id, props) => {
  const keys = Object.keys(props);
  const entities = db[tableName].filter((entity) => {
    const propCondition = keys.every((key) => props[key] === entity[key]);
    const idCondition = entity.id === id;

    return propCondition && idCondition;
  });

  if (entities.length > 1) {
    throw new DataCorruptedError(tableName, id);
  }

  return entities[0];
};

/**
 * @param {String} tableName
 * @param {Object} entity
 * @returns {Promise}
 */
const createEntity = async (tableName, entity) => {
  db[tableName].push(entity);

  return getEntityById(tableName, entity.id);
};

/**
 * @param {String} tableName
 * @param {String} id
 * @param {Object} props
 * @returns {Promise}
 */
const updateEntity = async (tableName, id, props) => {
  const entity = await getEntityById(tableName, id);

  if (entity) {
    const entityIndex = db[tableName].indexOf(entity);

    db[tableName][entityIndex] = new entity.constructor({
      ...entity,
      ...props,
    });
  }

  return getEntityById(tableName, id);
};

/**
 * @param {String} tableName
 * @param {String} id
 * @returns {Boolean}
 */
const deleteEntity = async (tableName, id) => {
  const entity = await getEntityById(tableName, id);

  if (entity) {
    db[tableName] = db[tableName].filter((ent) => ent !== entity);
  }

  return !!entity;
};

/* #region init db */
(() => {
  const createString = (num = 1000) => String(Math.floor(Math.random() * num));

  for (let i = 0; i < 5; i += 1) {
    db.Users.push(
      new User({
        id: String(i),
        name: createString(),
        login: createString(10_000),
        password: createString(100_000),
      })
    );
  }

  db.Boards.push(
    new Board({
      id: '0',
      title: 'Test board',
    })
  );

  db.Tasks.push(
    new Task({
      title: '0',
      userId: db.Users[0].id,
      boardId: db.Boards[0].id,
      columnId: db.Boards[0].columns[0].id,
    })
  );
})();
/* #endregion */

module.exports = {
  getAllEntities,
  getEntitiesByProps,
  getEntityById,
  getEntityByIdAndProps,
  createEntity,
  updateEntity,
  deleteEntity,
};
