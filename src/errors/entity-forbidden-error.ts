import CustomError from './custom-error';

class EntityForbiddenError extends CustomError {
  code = 'ERR_ENTITY_FORBIDDEN';

  constructor(message: string) {
    super(`Access denied: ${message}`);
  }
}

export default EntityForbiddenError;
