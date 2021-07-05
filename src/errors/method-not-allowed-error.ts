import CustomError from './custom-error';

class MethodNotAllowedError extends CustomError {
  code = 'ERR_METHOD_NOT_ALLOWED';

  constructor(message = 'Not allowed') {
    super(message);
  }
}

export default MethodNotAllowedError;
