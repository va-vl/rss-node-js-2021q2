class CustomError extends Error {
  name: string;
  code: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = 'ERR_CUSTOM_ERROR';
  }
}

export default CustomError;
