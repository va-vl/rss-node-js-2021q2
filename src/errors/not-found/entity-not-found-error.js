/**
 * Class representing EntityNotFound error
 * @description Thrown when Entity was not found
 * @augments Error
 */
class EntityNotFoundError extends Error {
  /**
   * @param {String} entityName 'Board', 'User', or 'Task'
   * @param {String} id entity id
   */
  constructor(entityName, id) {
    super(`Error: ${entityName} with id ${id} not found!`);
    this.code = 'ERR_ENTITY_NOT_FOUND';
    this.name = this.constructor.name;
  }
}

module.exports = EntityNotFoundError;
