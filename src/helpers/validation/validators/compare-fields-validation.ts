import { FieldValidation } from "@/helpers/validation/protocols";
import { InvalidFieldError } from "@/helpers/validation/errors";

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate (value: string): Error | null {
    return value === this.valueToCompare ? null : new InvalidFieldError(this.field);
  }
}