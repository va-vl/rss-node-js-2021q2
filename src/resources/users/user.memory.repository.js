const DB = require("../../db/db.memory");

const TABLE_NAME = 'Users';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const get = async (id) => {
  const user = DB.getEntity(TABLE_NAME, id);
  
  if (!user) {
    throw new Error(`Couldn't find a user with id: ${id}`);
  }

  return user;
};

const remove = async (id) => {
  const removedEntity = DB.removeEntity(TABLE_NAME, id);
  
  if (!removedEntity) {
    throw new Error(`Couldn't find a user with id: ${id}`);
  }
};

const save = async (user) => DB.saveEntity(TABLE_NAME, user);

const update = async (id, user) => {
  const entity = DB.updateEntity(TABLE_NAME, id, user);

  if (!entity) {
    throw new Error(`Couldn't find a user with id: ${id}`);
  }
}

module.exports = {
  getAll,
  get,
  remove,
  save,
  update,
};
