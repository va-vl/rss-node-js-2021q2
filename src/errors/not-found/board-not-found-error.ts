import CustomError = require('../custom-error');

class BoardNotFoundError extends CustomError {
  constructor(id: string) {
    super(`Error: Board ${id} not found!`);
  }
}

export = BoardNotFoundError;
