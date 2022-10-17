import { expect } from '@jest/globals';
import { EmailValidation, MinLengthValidation, RequiredFieldValidation, CompareFieldsValidation, ValidationComposite } from '@/helpers/validation/validators';
import { makeSignUpValidation } from '@/main/factories/pages';

describe('SignUpValidationFactory', () => {
  it('should make SignUpValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation();
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('name'),
      new MinLengthValidation('name', 3),
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5),
      new RequiredFieldValidation('passwordConfirmation'),
      new MinLengthValidation('passwordConfirmation', 5),
      new CompareFieldsValidation('passwordConfirmation', 'password'),
    ]));
  });
});
