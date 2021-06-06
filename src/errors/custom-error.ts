class CustomError extends Error {
  name: string;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export default CustomError;
