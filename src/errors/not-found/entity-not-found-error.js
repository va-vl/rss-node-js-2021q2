class EntityNotFoundError extends Error {
  /**
   * @param {String} entityName
   * @param {String} id
   */
  constructor(entityName, id) {
    super(`Error: ${entityName} with id ${id} not found!`);
    this.code = 'ERR_ENTITY_NOT_FOUND';
    this.name = this.constructor.name;
  }
}

module.exports = EntityNotFoundError;
