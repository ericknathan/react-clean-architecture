import { Validation } from '@/presentation/protocols';
import { FieldValidation } from '@/helpers/validation/protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  validate({ fieldName, fieldValue }: Validation.Params): Validation.Result {
    const validators = this.validators.filter(validator => validator.field === fieldName);
    for(const validator of validators) {
      const error = validator.validate(fieldValue);
      if(error) {
        return error.message;
      }
    }
  }
}