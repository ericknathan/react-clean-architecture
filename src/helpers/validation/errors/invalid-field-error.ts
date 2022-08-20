export class InvalidFieldError extends Error {
  constructor(
    fieldName: string,
    message?: string
  ) {
    super(message || `Campo ${fieldName} inválido.`);
    this.name = 'InvalidFieldError';
  }
}
