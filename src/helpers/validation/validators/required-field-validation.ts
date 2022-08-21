import { FieldValidation } from "@/helpers/validation/protocols";
import { RequiredFieldError } from "@/helpers/validation/errors";

export class RequiredFieldValidation implements FieldValidation {
  constructor (
    readonly field: string
  ) {}

  validate(value: string): Error | null {
    return value ? null : new RequiredFieldError();
  }
}
