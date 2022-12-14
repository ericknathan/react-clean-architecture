import { Validation } from '@/presentation/protocols';
import { FieldValidation } from '@/helpers/validation/protocols';

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate({ fieldName, input }: Validation.Params): Validation.Result {
    const validators = this.validators.filter(validator => validator.field === fieldName);
    for(const validator of validators) {
      const error = validator.validate(input);
      if(error) {
        return error.message;
      }
    }
  }
}
