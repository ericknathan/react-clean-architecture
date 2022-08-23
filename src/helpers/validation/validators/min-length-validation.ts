import { FieldValidation } from "@/helpers/validation/protocols";
import { InvalidFieldError } from "@/helpers/validation/errors";

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    readonly minLength: number
  ) {}

  validate(input: FieldValidation.Params): FieldValidation.Result {
    return input[this.field]?.length < this.minLength  ? new InvalidFieldError(this.field, `O valor de ${this.field} deve ter no mínimo ${this.minLength} caracteres.`) : null;
  }
}
