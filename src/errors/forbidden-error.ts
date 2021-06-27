import CustomError from './custom-error';

class ForbiddenError extends CustomError {
  code = 'ERR_FORBIDDEN';

  constructor(message: string) {
    super(`Forbidden: ${message}`);
  }
}

export default ForbiddenError;
