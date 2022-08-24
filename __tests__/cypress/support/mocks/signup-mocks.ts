import { faker } from '@faker-js/faker/locale/pt_BR';
import { HttpHelper } from '@/tests/cypress/support/mocks';

export const mockEmailInUseError = (): void => HttpHelper.mockEmailInUseError(/signup/);
export const mockUnexpectedError = (): void => HttpHelper.mockUnexpectedError(/signup/, 'POST');
export const mockInvalidData = (): void => HttpHelper.mockOk(/signup/, 'POST', { invalid: faker.random.word() });
