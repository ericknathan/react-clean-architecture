import { FieldValidation } from "@/helpers/validation/protocols";
import { InvalidFieldError } from "@/helpers/validation/errors";

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: FieldValidation.Params): FieldValidation.Result {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError(this.field) : null;
  }
}
