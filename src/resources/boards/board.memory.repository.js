const DB = require("../../db/db.memory");

const TABLE_NAME = 'Boards';

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const get = async (id) => DB.getEntity(TABLE_NAME, id);

const remove = async (id) => DB.removeEntity(TABLE_NAME, id);

const save = async (board) => DB.saveEntity(TABLE_NAME, board);

const update = async (id, board) => {
  const entity = DB.updateEntity(TABLE_NAME, id, board);

  if (!entity) {
    throw new Error(`Couldn't find a user with id: ${id}`);
  }
};

module.exports = {
  getAll,
  get,
  remove,
  save,
  update
}
