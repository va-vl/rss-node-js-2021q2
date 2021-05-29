import CustomError from '../custom-error';

class BoardNotFoundError extends CustomError {
  code: string;
  
  constructor(id: string) {
    super(`Error: Board ${id} not found!`);
    this.code = 'ERR_ENTITY_NOT_FOUND';
  }
}

export default BoardNotFoundError;
