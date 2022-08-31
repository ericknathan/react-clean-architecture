import { faker } from '@faker-js/faker/locale/pt_BR';
import { HttpHelper } from '@/tests/cypress/support/mocks';

export const mockInvalidCredentialsError = (): void => HttpHelper.mockInvalidCredentialsError(/login/);
export const mockUnexpectedError = (): void => HttpHelper.mockUnexpectedError(/login/, 'POST');
export const mockOk = (): void => HttpHelper.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.firstName() });
export const mockInvalidData = (): void => HttpHelper.mockOk(/login/, 'POST', { invalid: faker.random.word() });
