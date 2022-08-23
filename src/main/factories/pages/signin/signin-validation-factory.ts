import { ValidationBuilder as Builder, ValidationComposite } from '@/helpers/validation/validators';

export const makeSignInValidation = () => ValidationComposite.build([
  ...Builder.field('email').required().email().build(),
  ...Builder.field('password').required().min(5).build(),
]);
