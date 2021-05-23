/**
 * Class representing DataCorruptedError error
 * @description Thrown when database is corrupted
 * @augments Error
 */
class DataCorruptedError extends Error {
  /**
   * @param {String} entity - 'Board', 'User', or 'Task'
   * @param {String} id - entity id
   */
  constructor(entity, id) {
    super(`Corrupted Database: More than one ${entity} with id ${id} present.`);
    this.name = this.constructor.name;
    this.code = 'ERR_DATA_CORRUPTED';
  }
}

module.exports = DataCorruptedError;
