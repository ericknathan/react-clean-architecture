export class InvalidFieldError extends Error {
  constructor(
    fieldName: string,
    message?: string
  ) {
    super(`Campo ${fieldName} inválido. ${message || ''}`);
    this.name = 'InvalidFieldError';
  }
}
