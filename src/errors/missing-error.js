class MissingError extends Error {
  /**
   * @param {String} entityName 
   * @param {String} id 
   * @param {String} extra 
   */
  constructor(entityName, id, extra = '') {
    super(`Error: ${entityName} with id ${id} not found!${extra && ` ${extra}`}`);
    this.name = 'MissingError';
  }
}

module.exports = MissingError;