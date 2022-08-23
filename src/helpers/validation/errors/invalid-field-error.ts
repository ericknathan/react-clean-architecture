import { DICTIONARY } from "@/helpers/typo/DICTIONARY";

export class InvalidFieldError extends Error {
  constructor(
    fieldName: string,
    message?: string
  ) {
    super(message || `Campo ${DICTIONARY.FIELDS[fieldName] || fieldName} inválido.`);
    this.name = 'InvalidFieldError';
  }
}
