class CustomError extends Error {
  code: number | null;
  field: string | null;

  constructor(code: number | null, field: string | null, message: string) {
    super(message);
    this.code = code;
    this.field = field;
  }
}

export { CustomError };
