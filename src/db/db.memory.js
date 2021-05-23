/**
 * In-memory database
 * @module database/memory
 */
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const User = require('../resources/users/user.model');
const { DataCorruptedError } = require('../errors');

/**
 * An in-memory database object
 * @type {Object}
 * @property {Array<Task>} Tasks - array of existing Task instances
 * @property {Array<User>} Users - array of existing User instances
 * @property {Array<Board>} Boards - array of existing Board instances
 */
const db = {
  Tasks: [],
  Users: [],
  Boards: [],
};

/**
 * Retrieves all instances of tableName
 * @param {String} tableName - 'Tasks', 'Users', or 'Boards'
 * @returns {Promise<Array<Task|User|Board>>} - a promise resolving to an array of all instances of a given tableName
 */
const getAllEntities = async (tableName) =>
  db[tableName].filter((entity) => entity);

/**
 * Retrieves all instances that fit search criteria defined in props
 * @param {String} tableName - 'Tasks', 'Users', or 'Boards'
 * @param {Object} props - an object of key: value pairs
 * @returns {Promise<Array<Task|User|Board>>} - a promise resolving to an array of entities
 */
const getEntitiesByProps = async (tableName, props) => {
  const keys = Object.keys(props);

  return db[tableName].filter((entity) =>
    keys.every((key) => props[key] === entity[key])
  );
};

/**
 * Retrieves an entity by provided tableName and id
 * @param {String} tableName - 'Tasks', 'Users', or 'Boards'
 * @param {String} id - entity id
 * @throws {DataCorruptedError} - rejects if more than one entity with given id found
 * @returns {Promise<Task|User|Board|undefined>} - a promise resolving to entity or undefined
 */
const getEntityById = async (tableName, id) => {
  const entities = db[tableName].filter((item) => id === item.id);

  if (entities.length > 1) {
    throw new DataCorruptedError(tableName, id);
  }

  return entities[0];
};

/**
 * Retrieves an entity by provided tableName, id, and props
 * @param {String} tableName - 'Tasks', 'Users', or 'Boards'
 * @param {String} id - entity id
 * @param {Object} props - an object of key: value pairs
 * @throws {DataCorruptedError} - rejects if more than one entity with given id found
 * @returns {Promise<Task|User|Board|undefined>} - a promise resolving to entity or undefined
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
 * Pushes an entity to its collection
 * @param {String} tableName - 'Tasks', 'Users', or 'Boards'
 * @param {Board|Task|User} entity - an instance of entity
 * @throws {DataCorruptedError} - rejects if more than one entity with given id found
 * @returns {Promise<Board|Task|User>} - a promise resolving to entity
 */
const createEntity = async (tableName, entity) => {
  db[tableName].push(entity);

  return getEntityById(tableName, entity.id);
};

/**
 * Finds an entity by tableName and id, overwrites it with new props
 * @param {String} tableName - 'Tasks', 'Users', or 'Boards'
 * @param {String} id - entity id
 * @param {Object} props - collection of key: value pairs
 * @throws {DataCorruptedError} - rejects if more than one entity with given id found
 * @returns {Promise<Task|User|Board|undefined>} - a promise resolving to entity or undefined
 */
const updateEntity = async (tableName, id, props) => {
  const entity = await getEntityById(tableName, id);

  if (!entity) {
    return undefined;
  }

  const entityIndex = db[tableName].indexOf(entity);

  db[tableName][entityIndex] = new entity.constructor({
    ...entity,
    ...props,
  });

  return getEntityById(tableName, id);
};

/**
 * Removes an entity
 * @param {String} tableName - 'Tasks', 'Users', or 'Boards'
 * @param {String} id - entity id
 * @throws {DataCorruptedError} - rejects if more than one entity with given id found
 * @returns {Promise<Boolean>} - a promise resolving to true if entity was found, false - if wasn't
 */
const deleteEntity = async (tableName, id) => {
  const entity = await getEntityById(tableName, id);

  if (entity) {
    db[tableName] = db[tableName].filter((ent) => ent !== entity);
  }

  return !!entity;
};

/* #region init db for postman testing */
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
