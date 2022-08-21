import { ValidationBuilder, ValidationComposite } from '@/helpers/validation/validators';
import { makeSignInValidation } from '@/main/factories/pages';

describe('SignInValidationFactory', () => {
  it('should make SignInValidationComposite with correct validations', () => {
    const composite = makeSignInValidation();
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
    ]));
  });
});
