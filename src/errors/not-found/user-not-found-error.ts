import CustomError from '../custom-error';

class UserNotFoundError extends CustomError {
  code: string;

  constructor(id: string) {
    super(`Error: User ${id} not found!`);
    this.code = 'ERR_ENTITY_NOT_FOUND';
  }
}

export default UserNotFoundError;