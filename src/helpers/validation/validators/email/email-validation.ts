import { FieldValidation } from "@/helpers/validation/protocols";
import { InvalidFieldError } from "@/helpers/validation/errors";

export class EmailValidation implements FieldValidation {
  constructor (
    readonly field: string
  ) {}

  validate(value: string): Error | null {
    return value ? null : new InvalidFieldError('email');
  }
}