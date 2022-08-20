import { FieldValidation } from "@/helpers/validation/protocols";
import { InvalidFieldError } from "@/helpers/validation/errors";

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    readonly minLength: number
  ) {}

  validate(value: string): Error | null {
    return value.length >= this.minLength ? null : new InvalidFieldError(this.field, `O valor deve ter no mínimo ${this.minLength} caracteres.`);
  }
}