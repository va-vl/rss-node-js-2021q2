import CustomError from './custom-error';

class NotAuthorizedError extends CustomError {
  code = 'ERR_NOT_AUTHORIZED';

  constructor(message = 'Not authorized!') {
    super(message);
  }
}

export default NotAuthorizedError;
