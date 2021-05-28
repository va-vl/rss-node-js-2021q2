import CustomError = require('../custom-error');

class TaskNotFoundError extends CustomError {
  constructor(id: string, boardId: string) {
    super(`Error: Task ${id} on Board ${boardId} not found!`);
  }
}

export = TaskNotFoundError;
