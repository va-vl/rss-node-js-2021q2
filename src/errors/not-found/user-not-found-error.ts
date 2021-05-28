import CustomError = require('../custom-error');

class UserNotFoundError extends CustomError {
  constructor(id: string) {
    super(`Error: User ${id} not found!`);
  }
}

export = UserNotFoundError;