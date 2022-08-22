import { FieldValidation } from '@/helpers/validation/protocols';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation
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

  min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length));
    return this;
  }

  sameAs(compareValue: string): ValidationBuilder {
    this.validations.push(new CompareFieldsValidation(this.fieldName, length));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
