import { expect } from '@jest/globals';
import { ValidationBuilder as Builder, ValidationComposite } from '@/helpers/validation/validators';
import { makeSignInValidation } from '@/main/factories/pages';

describe('SignInValidationFactory', () => {
  it('should make SignInValidationComposite with correct validations', () => {
    const composite = makeSignInValidation();
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build(),
    ]));
  });
});
