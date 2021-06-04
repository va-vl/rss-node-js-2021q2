import CustomError from './custom-error';

class DataCorruptedError extends CustomError {
  code: string;

  constructor(entity: string, id: string) {
    super('');
    this.message = `Data Corrupted: More than one ${entity} with id ${id} present.`;
    this.code = 'ERR_DATA_CORRUPTED';
  }
}

export default DataCorruptedError;
