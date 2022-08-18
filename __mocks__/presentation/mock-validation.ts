import { Validation } from "@/presentation/protocols";

export class ValidationSpy implements Validation {
  errorMessage = '';
  fieldName = '';
  fieldValue = '';

  validate({ fieldName, fieldValue }: Validation.Params): Validation.Result {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}