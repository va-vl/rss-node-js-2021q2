class EntityNotFoundError extends Error {
  /**
   * @param {String} entityName 
   * @param {String} id 
   */
  constructor(entityName, id) {
    super(`Error: ${entityName} with id ${id} not found!`);
    this.name = 'EntityNotFoundError';
    this.code = 'ERR_ENTITY_NOT_FOUND';
  }
}

module.exports = EntityNotFoundError;