import { HttpHelper } from '@/tests/cypress/support/mocks';

export const mockUnexpectedError = (): void => HttpHelper.mockUnexpectedError(/surveys/, 'GET');
export const mockAccessDeniedError = (): void => HttpHelper.mockForbiddenError(/surveys/, 'GET');
