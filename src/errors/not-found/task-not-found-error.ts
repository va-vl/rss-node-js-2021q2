import CustomError from '../custom-error';

class TaskNotFoundError extends CustomError {
  code: string;

  constructor(id: string, boardId: string) {
    super(`Error: Task ${id} on Board ${boardId} not found!`);
    this.code = 'ERR_ENTITY_NOT_FOUND';
  }
}

export default TaskNotFoundError;
