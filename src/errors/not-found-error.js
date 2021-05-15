class NotFoundError extends Error {
  /**
   * @param {String} entityName 
   * @param {String} id 
   * @param {String} extra 
   */
  constructor(entityName, id, extra = '') {
    super(`Error: ${entityName} with id ${id} not found!${extra && ` ${extra}`}`);
  }
}

module.exports = NotFoundError;