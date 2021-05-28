import CustomError = require('./custom-error');

class DataCorruptedError extends CustomError {
  code: string;

  constructor(entity: string, id: string) {
    super(`Corrupted Database: More than one ${entity} with id ${id} present.`);
    this.code = 'ERR_DATA_CORRUPTED';
  }
}

export = DataCorruptedError;
