class DataCorruptedError extends Error {
  /**
   * @param {String} entity
   * @param {String} id
   */
  constructor(entity, id) {
    super(`Corrupted Database: More than one ${entity} with id ${id} present.`);
    this.name = this.constructor.name;
    this.code = 'ERR_DATA_CORRUPTED';
  }
}

module.exports = DataCorruptedError;
