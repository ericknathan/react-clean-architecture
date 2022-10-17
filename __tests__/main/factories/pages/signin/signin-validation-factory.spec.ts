import { expect } from '@jest/globals';
import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationComposite } from '@/helpers/validation/validators';
import { makeSignInValidation } from '@/main/factories/pages';

describe('SignInValidationFactory', () => {
  it('should make SignInValidationComposite with correct validations', () => {
    const composite = makeSignInValidation();
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5),
    ]));
  });
});
