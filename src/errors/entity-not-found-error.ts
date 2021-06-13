import CustomError from './custom-error';

class EntityNotFoundError extends CustomError {
  constructor(
    entity: string,
    id: string,
    extra?: Record<string, string | null>
  ) {
    super('');
    this.code = 'ERR_ENTITY_NOT_FOUND';
    this.message = `Entity Not Found: ${entity} with id ${id} not found in database.`;

    if (extra !== undefined && extra !== null && typeof extra === 'object') {
      this.message += ` ${Object.entries(extra)
        .map(([key, value]) => `${key}: ${value}`)
        .join(' ')}`;
    }
  }
}

export default EntityNotFoundError;
