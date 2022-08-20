import { ValidationBuilder, ValidationComposite } from '@/helpers/validation/validators';
import { makeLoginValidation } from '@/main/factories/pages';

describe('LoginValidationFactory', () => {
  it('should make LoginValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
    ]));
  });
});
