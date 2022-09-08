import { faker } from '@faker-js/faker/locale/pt_BR';
import { HttpHelper } from '@/tests/cypress/support/mocks';

export const mockEmailInUseError = (): void => HttpHelper.mockForbiddenError(/signup/, 'POST');
export const mockUnexpectedError = (): void => HttpHelper.mockUnexpectedError(/signup/, 'POST');
export const mockOk = (): void => HttpHelper.mockOk(/signup/, 'POST', { accessToken: faker.datatype.uuid(), name: faker.name.firstName() });
