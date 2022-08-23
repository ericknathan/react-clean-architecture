import { ValidationBuilder as Builder, ValidationComposite } from '@/helpers/validation/validators';

export const makeSignUpValidation = () => ValidationComposite.build([
  ...Builder.field('name').required().min(3).build(),
  ...Builder.field('email').required().email().build(),
  ...Builder.field('password').required().min(5).build(),
  ...Builder.field('passwordConfirmation').required().sameAs('password').min(5).build(),
]);
