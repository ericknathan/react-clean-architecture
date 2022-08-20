import { FieldValidation } from '@/helpers/validation/protocols';
import {
  RequiredFieldValidation,
  EmailValidation
} from '@/helpers/validation/validators';

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[],
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation());
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}