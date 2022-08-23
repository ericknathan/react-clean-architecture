import { FieldValidation } from "@/helpers/validation/protocols";
import { RequiredFieldError } from "@/helpers/validation/errors";

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate(input: FieldValidation.Params): FieldValidation.Result {
    return input[this.field] ? null : new RequiredFieldError();
  }
}
