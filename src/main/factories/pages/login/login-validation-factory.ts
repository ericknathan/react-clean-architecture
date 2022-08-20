import { ValidationBuilder, ValidationComposite } from '@/helpers/validation/validators';

export const makeLoginValidation = () => ValidationComposite.build([
  ...ValidationBuilder.field('email').required().email().build(),
  ...ValidationBuilder.field('password').required().min(5).build(),
]);
