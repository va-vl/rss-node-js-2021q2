import CustomError from './custom-error';

class InvalidOperationError extends CustomError {
  constructor(
    entity: string,
    id: string,
    operation: string,
    extra?: Record<string, string | null>
  ) {
    super('');
    this.code = 'ERR_INVALID_OPERATION';
    this.message = `Invalid Operation: Cannot perform ${operation} on ${entity} with id ${id} because it does not exist.`;

    if (extra !== undefined && extra !== null && typeof extra === 'object') {
      this.message += ` ${Object.entries(extra)
        .map(([key, value]) => `${key}: ${value}`)
        .join(' ')}`;
    }
  }
}

export default InvalidOperationError;
