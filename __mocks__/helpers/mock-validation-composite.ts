import { FieldValidation } from '@/helpers/validation/protocols';

export class FieldValidationStub implements FieldValidation {
  error: FieldValidation.Result = null;
  constructor (readonly field: string) {}

  validate(value: FieldValidation.Params): FieldValidation.Result {
    return this.error;
  };
}